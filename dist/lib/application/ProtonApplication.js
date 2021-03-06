"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const DBConnector_1 = require("../database/DBConnector");
const DefaultDBConnector_1 = require("../database/DefaultDBConnector");
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
        this.express = express_1.default();
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
                this.startServers();
                resolve(this);
            }).catch(error => reject(error));
        });
    }
    connectDB() {
        if (this.dbConnector) {
            return this.dbConnector.createConnection(this.config.database);
        }
        else {
            return new DefaultDBConnector_1.DefaultDBConnector().createConnection(this.config.database);
        }
    }
    startServers() {
        let servers = this.config.servers;
        if (servers && servers.length > 0) {
            servers.forEach(server => {
                this.startServer(server.port, server.useHttps);
            });
        }
        else {
            this.logger.error('No server found');
        }
    }
    startServer(port, useHttps) {
        if (this.config.https && useHttps) {
            const credentials = {
                key: fs_1.default.readFileSync(this.config.https.key),
                cert: fs_1.default.readFileSync(this.config.https.cert)
            };
            https_1.default.createServer(credentials, this.express)
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
            this.express.use((req, res, next) => {
                middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this));
                if (middleware.autoNext) {
                    next();
                }
            });
        });
    }
    /**
     * Initialize all configured routes annotated with @Route
     */
    configureRoutes() {
        this.routers.forEach(router => {
            router.init(this);
            let configs = router.getRouteConfigs();
            if (configs != null) {
                let routerMiddewares = this.configRouterMiddlewares(router);
                configs.forEach(config => {
                    if (config.method != null && config.endpoint != null) {
                        this.createRoutesByMethod(config, router, routerMiddewares);
                    }
                    else {
                        config.routeFunction.call(router);
                    }
                });
            }
        });
    }
    createRoutesByMethod(routeConfig, router, routerMiddlewares) {
        switch (routeConfig.method) {
            case Method_1.Method.GET:
                this.express.get(router.getBaseUrl() + routeConfig.endpoint, routerMiddlewares, this.configRouteMiddlewares(routeConfig), (req, res) => {
                    routeConfig.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.POST:
                this.express.post(router.getBaseUrl() + routeConfig.endpoint, routerMiddlewares, this.configRouteMiddlewares(routeConfig), (req, res) => {
                    routeConfig.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.PUT:
                this.express.put(router.getBaseUrl() + routeConfig.endpoint, routerMiddlewares, this.configRouteMiddlewares(routeConfig), (req, res) => {
                    routeConfig.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.DELETE:
                this.express.delete(router.getBaseUrl() + routeConfig.endpoint, routerMiddlewares, this.configRouteMiddlewares(routeConfig), (req, res) => {
                    routeConfig.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.PATCH:
                this.express.patch(router.getBaseUrl() + routeConfig.endpoint, routerMiddlewares, this.configRouteMiddlewares(routeConfig), (req, res) => {
                    routeConfig.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.OPTIONS:
                this.express.options(router.getBaseUrl() + routeConfig.endpoint, routerMiddlewares, this.configRouteMiddlewares(routeConfig), (req, res) => {
                    routeConfig.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method_1.Method.HEAD:
                this.express.head(router.getBaseUrl() + routeConfig.endpoint, routerMiddlewares, this.configRouteMiddlewares(routeConfig), (req, res) => {
                    routeConfig.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
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
    withDBConnectorAs(dbConnector) {
        this.withDBConnector(new dbConnector());
        return this;
    }
    withConfig(config) {
        this.config = config;
        return this;
    }
    /**
     * Configures the Route Scope Middlewares
     */
    configRouteMiddlewares(config) {
        return this.getExpressMiddlewaresList(config.middlewares);
    }
    /**
     *  Configures the Router Scope Middlewares
     */
    configRouterMiddlewares(router) {
        return this.getExpressMiddlewaresList(router.getRouterMiddlewares());
    }
    getExpressMiddlewaresList(BaseMiddlewares) {
        let middlewares = [];
        if (BaseMiddlewares) {
            BaseMiddlewares.forEach(middleware => {
                if (middleware && middleware.middlewareFuntion) {
                    middleware.init(this);
                    middleware.configMiddlewares();
                    middlewares.push((req, res, next) => {
                        middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this));
                        if (middleware.autoNext) {
                            next();
                        }
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
    addRouterAs(router) {
        this.addRouter(new router());
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
    addMiddlewareAs(middleware) {
        this.addMiddleware(new middleware());
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