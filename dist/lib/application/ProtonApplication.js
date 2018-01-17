"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Express = require("express");
const fs = require("fs");
const https = require("https");
const DBConnector_1 = require("../database/DBConnector");
const TypeORMDBConnector_1 = require("../database/typeorm/TypeORMDBConnector");
const DefaultMiddleware_1 = require("../middlewares/DefaultMiddleware");
const Method_1 = require("../router/Method");
const Logger_1 = require("./Logger");
const ProtonConfigLoader_1 = require("./ProtonConfigLoader");
/**
 * @author Humberto Machado
 * Protontype main class. Configure and start Routers, Middlewares and bootstrap application
 */
class ProtonApplication {
    /**
     * Create Protontype aplication
     */
    constructor(config) {
        this.middlewares = [];
        this.routers = [];
        this.config = this.loadConfig(config);
        this.logger = Logger_1.Logger.createLogger(this.config.logger);
        this.express = Express();
    }
    /**
     * Start up Protontype application.
     * @return express instance
     */
    start() {
        return new Promise((resolve, reject) => {
            this.connectDB().then(connection => {
                DBConnector_1.ProtonDB.dbConnection = connection;
                this.configMiddlewares();
                this.configureRoutes();
                this.startServer(this.config);
                resolve(this);
            }).catch(error => reject(error));
        });
    }
    /**
     * Start up Protontype application.
     * @deprecated use start()
     * @return express instance
     */
    bootstrap() {
        return this.start();
    }
    connectDB() {
        if (this.dbConnector) {
            return this.dbConnector.createConnection(this.config.database);
        }
        else {
            return new TypeORMDBConnector_1.TypeORMDBConnector().createConnection(this.config.database);
        }
    }
    startServer(config) {
        let port = this.config.port;
        this.express.set("port", port);
        if (config.https && config.https.enabled) {
            const credentials = {
                key: fs.readFileSync(config.https.key),
                cert: fs.readFileSync(config.https.cert)
            };
            https.createServer(credentials, this.express)
                .listen(port, () => this.logger.info(`Application listen port ${port} (HTTPS)`));
        }
        else {
            this.express.listen(port, () => this.logger.info(`Application listen port ${port} (HTTP)`));
        }
    }
    loadConfig(config) {
        if (config) {
            return config;
        }
        else {
            config = ProtonConfigLoader_1.ProtonConfigLoader.loadConfig();
            if (!config) {
                config = ProtonConfigLoader_1.DEFAULT_CONFIG;
            }
            return config;
        }
    }
    /**
     * Configure global Middlewares. Application scope
     */
    configMiddlewares() {
        new DefaultMiddleware_1.DefaultMiddleware().init(this).configMiddlewares();
        this.middlewares.forEach(middleware => {
            middleware.init(this);
            middleware.configMiddlewares();
            this.express.use((req, res, next) => middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this)));
        });
    }
    /**
     * Initialize all configured routes annotated with @Route
     */
    configureRoutes() {
        this.routers.forEach(router => {
            router.init(this);
            var configs = router.getRouteConfigs();
            if (configs != null) {
                configs.forEach(config => {
                    if (config.method != null && config.endpoint != null) {
                        this.createRoutesByMethod(config, router);
                    }
                    else {
                        config.routeFunction.call(router);
                    }
                });
            }
        });
    }
    createRoutesByMethod(config, router) {
        switch (config.method) {
            case Method_1.Method.GET:
                this.express.get(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.POST:
                this.express.post(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.PUT:
                this.express.put(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.DELETE:
                this.express.delete(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.PATCH:
                this.express.patch(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.OPTIONS:
                this.express.options(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.HEAD:
                this.express.head(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
        }
    }
    createRouterFunctionParams(req, res, app) {
        return { req: req, res: res, app: app };
    }
    createMiddlewareFunctionParams(req, res, next, app) {
        return { req: req, res: res, next: next, app: app };
    }
    withDBConnector(dbConnector) {
        this.dbConnector = dbConnector;
        return this;
    }
    /**
     * Configures the Route Scope Middlewares and Router Scope Middlewares
     *
     * @param config
     * @param router
     */
    configRouteMiddlewares(config, router) {
        let middlewares = [];
        let protonMiddlewares = router.getRouterMiddlewares().concat(config.middlewares);
        if (protonMiddlewares) {
            protonMiddlewares.forEach(middleware => {
                if (middleware && middleware.middlewareFuntion) {
                    middleware.init(this);
                    middleware.configMiddlewares();
                    middlewares.push((req, res, next) => {
                        middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this));
                    });
                }
                else {
                    middlewares.push((req, res, next) => { next(); });
                }
            });
        }
        else {
            middlewares.push((req, res, next) => { next(); });
        }
        return middlewares;
    }
    /**
     * Add Router to application
     * @param router Router implementation
     */
    addRouter(router) {
        this.routers.push(router);
        return this;
    }
    /**
     * Add Global Middleware. A middleware added here, will act for all routers of the application
     * @param middleware Middleware implementation
     */
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    /**
     * Return a express instance
     * @see {@link http://expressjs.com/en/4x/api.html}
     */
    getExpress() {
        return this.express;
    }
    /**
     * Return a list of Confugured routers
     */
    getRouters() {
        return this.routers;
    }
    /**
     * Return {@link GlobalConfig} object. Content of proton.json file
     */
    getConfig() {
        return this.config;
    }
    /**
     * @return list of all endpoints loaded in ProtonApplication
     */
    getRoutesList() {
        let routeList = [];
        this.express._router.stack.forEach(r => {
            if (r.route && r.route.path) {
                routeList.push({
                    method: r.route.stack[0].method.toUpperCase(),
                    path: r.route.path
                });
            }
        });
        this.routers.forEach(router => {
            router.getRouter().stack.forEach(r => {
                if (r.route && r.route.path) {
                    routeList.push({
                        method: r.route.stack[0].method.toUpperCase(),
                        path: router.getBaseUrl() + r.route.path
                    });
                }
            });
        });
        return routeList;
    }
}
exports.ProtonApplication = ProtonApplication;
//# sourceMappingURL=ProtonApplication.js.map