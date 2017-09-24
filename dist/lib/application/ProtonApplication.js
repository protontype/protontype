"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultMiddleware_1 = require("../middlewares/DefaultMiddleware");
const Method_1 = require("../router/Method");
const Logger_1 = require("./Logger");
const ProtonConfigLoader_1 = require("./ProtonConfigLoader");
const ProtonDB_1 = require("./ProtonDB");
const Express = require("express");
const fs = require("fs");
const https = require("https");
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
        this.protonDB = new ProtonDB_1.ProtonDB(this.config.database).loadModels();
    }
    /**
     * Start up Protontype application.
     * @return express instance
     */
    bootstrap() {
        return new Promise((resolve, reject) => {
            this.configMiddlewares();
            this.protonDB.start().then(() => {
                this.configureRoutes();
                this.startServer(this.config);
                resolve(this);
            }).catch((err) => {
                reject(err);
            });
        });
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
            this.express.use((req, res, next) => middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this.getModel(middleware.modelName), this)));
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
                this.express.get(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.POST:
                this.express.post(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.PUT:
                this.express.put(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.DELETE:
                this.express.delete(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.PATCH:
                this.express.patch(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.OPTIONS:
                this.express.options(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.HEAD:
                this.express.head(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
        }
    }
    createRouterFunctionParams(req, res, model, app) {
        return { req: req, res: res, model: model, app: app };
    }
    createMiddlewareFunctionParams(req, res, next, model, app) {
        return { req: req, res: res, next: next, model: model, app: app };
    }
    /**
     * Add Authentication Middleware
 
     * @param authMiddleware AuthMiddleware implementation
     */
    withAuthMiddleware(authMiddleware) {
        this.authMiddleware = authMiddleware;
        this.authMiddleware.init(this).configMiddlewares();
        return this;
    }
    /**
     * Used to route autentication.
     */
    authenticate(useAuth) {
        if (this.authMiddleware != null && useAuth) {
            return this.authMiddleware.authenticate();
        }
        else {
            return (req, res, next) => next();
        }
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
                        middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this.getModel(middleware.modelName), this));
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
     * Return a ProtonDB instance. This object provides database acess and Models
     */
    getProtonDB() {
        return this.protonDB;
    }
    /**
     * Return a instance of model by name
     * @param modelName Model name, defined in {@link @Model()} decotator
     */
    getModel(modelName) {
        return this.protonDB.getModel(modelName);
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