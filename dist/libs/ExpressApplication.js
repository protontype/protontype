"use strict";
var DefaultMiddleware_1 = require('../middlewares/DefaultMiddleware');
var Method_1 = require('../routes/Method');
var RouteConfigLoader_1 = require('./RouteConfigLoader');
var SequelizeDB_1 = require('./SequelizeDB');
var Express = require('express');
/**
 * @author Humberto Machado
 */
var ExpressApplication = (function () {
    /**
     * Create express application instance and middlewares
     */
    function ExpressApplication() {
        this.middlewares = [];
        this.routers = [];
        this.express = Express();
        this.sequelizeDB = new SequelizeDB_1.SequelizeDB();
    }
    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    ExpressApplication.prototype.bootstrap = function () {
        var _this = this;
        this.configMiddlewares();
        var port = this.express.get("port");
        this.sequelizeDB.getInstance().sync().then(function () {
            _this.configureRoutes();
            _this.express.listen(port, function () { return console.log("Application listen on port " + port); });
        });
        return this.express;
    };
    /**
     * Initilize all configured middlewares
     */
    ExpressApplication.prototype.configMiddlewares = function () {
        var _this = this;
        new DefaultMiddleware_1.DefaultMiddleware().init(this).configMiddlewares();
        this.middlewares.forEach(function (middleware) {
            middleware.init(_this);
            middleware.configMiddlewares();
        });
    };
    /**
     * Initialize all configured routes annotated with @Route
     */
    ExpressApplication.prototype.configureRoutes = function () {
        var _this = this;
        this.routers.forEach(function (router) {
            router.init(_this);
            var configs = RouteConfigLoader_1.RouteConfigLoader.routesConfigsByUrl[router.getBaseUrl()];
            if (configs != null) {
                configs.forEach(function (config) {
                    if (config.method != null && config.endpoint != null) {
                        _this.createRoutesByMethod(config, router);
                    }
                    else {
                        config.routeFunction.call(router);
                    }
                });
            }
        });
    };
    ExpressApplication.prototype.createRoutesByMethod = function (config, router) {
        var _this = this;
        switch (config.method) {
            case Method_1.Method.GET:
                this.express.get(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), function (req, res) {
                    config.routeFunction.call(router, req, res, _this.getModel(config.modelName));
                });
                break;
            case Method_1.Method.POST:
                this.express.post(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), function (req, res) {
                    config.routeFunction.call(router, req, res, _this.getModel(config.modelName));
                });
                break;
            case Method_1.Method.PUT:
                this.express.put(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), function (req, res) {
                    config.routeFunction.call(router, req, res, _this.getModel(config.modelName));
                });
                break;
            case Method_1.Method.DELETE:
                this.express.delete(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), function (req, res) {
                    config.routeFunction.call(router, req, res, _this.getModel(config.modelName));
                });
                break;
        }
    };
    /**
     * Add authentication middleware implementations
     */
    ExpressApplication.prototype.withAuthMiddleware = function (authMiddleware) {
        this.authMiddleware = authMiddleware;
        this.authMiddleware.init(this).configMiddlewares();
        return this;
    };
    /**
     * Used to route autentication.
     */
    ExpressApplication.prototype.authenticate = function (useAuth) {
        if (this.authMiddleware != null && useAuth) {
            return this.authMiddleware.authenticate();
        }
        else {
            return function (req, res, next) { return next(); };
        }
    };
    ExpressApplication.prototype.addRouter = function (router) {
        this.routers.push(router);
        return this;
    };
    ExpressApplication.prototype.addMiddleware = function (middleware) {
        this.middlewares.push(middleware);
        return this;
    };
    ExpressApplication.prototype.getExpress = function () {
        return this.express;
    };
    ExpressApplication.prototype.getSequelizeDB = function () {
        return this.sequelizeDB;
    };
    ExpressApplication.prototype.getModel = function (modelName) {
        return this.sequelizeDB.getModel(modelName);
    };
    ExpressApplication.prototype.getRouters = function () {
        return this.routers;
    };
    /**
     * @return list of all configured routes in ExpressApplication
     */
    ExpressApplication.prototype.getRoutesList = function () {
        var routeList = [];
        this.express._router.stack.forEach(function (r) {
            if (r.route && r.route.path) {
                routeList.push({
                    method: r.route.stack[0].method.toUpperCase(),
                    path: r.route.path
                });
            }
        });
        this.routers.forEach(function (router) {
            router.getRouter().stack.forEach(function (r) {
                if (r.route && r.route.path) {
                    routeList.push({
                        method: r.route.stack[0].method.toUpperCase(),
                        path: router.getBaseUrl() + r.route.path
                    });
                }
            });
        });
        return routeList;
    };
    return ExpressApplication;
}());
exports.ExpressApplication = ExpressApplication;
//# sourceMappingURL=ExpressApplication.js.map