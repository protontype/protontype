"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultMiddleware_1 = require("../middlewares/DefaultMiddleware");
const Method_1 = require("../router/Method");
const Logger_1 = require("./Logger");
const ProtonConfigLoader_1 = require("./ProtonConfigLoader");
const ProtonDB_1 = require("./ProtonDB");
const ProtonModelConfig_1 = require("../decorators/ProtonModelConfig");
const Express = require("express");
const fs = require("fs");
const https = require("https");
/**
 * @author Humberto Machado
 */
class ProtonApplication {
    /**
     * Create express application instance and middlewares
     */
    constructor(config) {
        this.middlewares = [];
        this.routers = [];
        this.config = this.loadConfig(config);
        this.logger = Logger_1.Logger.createLogger(this.config.logger);
        this.express = Express();
        this.protonDB = new ProtonDB_1.ProtonDB(this.config.database).loadModels(ProtonModelConfig_1.ProtonModelConfig.modelsList);
    }
    /**
     * Initialize express application and load middlewares
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
     * Initilize all configured middlewares
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
                this.express.get(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.routeConfigMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.POST:
                this.express.post(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.routeConfigMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.PUT:
                this.express.put(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.routeConfigMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.DELETE:
                this.express.delete(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.routeConfigMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.PATCH:
                this.express.patch(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.routeConfigMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.OPTIONS:
                this.express.options(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.routeConfigMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method_1.Method.HEAD:
                this.express.head(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), (req, res) => {
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
     * Add authentication middleware implementations
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
    routeConfigMiddlewares(config, router) {
        let middlewares = [];
        let protonMiddlewares = router.getRouterMiddlewares().concat(config.middlewares);
        if (protonMiddlewares) {
            protonMiddlewares.forEach(middleware => {
                if (middleware && middleware.middlewareFuntion) {
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
    addRouter(router) {
        this.routers.push(router);
        return this;
    }
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    getExpress() {
        return this.express;
    }
    getProtonDB() {
        return this.protonDB;
    }
    getModel(modelName) {
        return this.protonDB.getModel(modelName);
    }
    getRouters() {
        return this.routers;
    }
    getConfig() {
        return this.config;
    }
    /**
     * @return list of all configured routes in ProtonApplication
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