"use strict";
var SequelizeDB_1 = require("./SequelizeDB");
var Express = require("express");
var RouteConfigLoader_1 = require("./RouteConfigLoader");
var Method_1 = require("../routes/Method");
var DefaultMiddleware_1 = require("../middlewares/DefaultMiddleware");
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
        this.sequelizeDB.getDB().sequelize.sync().done(function () {
            _this.configureRoutes();
            _this.express.listen(port, function () { return console.log("Application listen on port " + port); });
        });
        return this.express;
    };
    ExpressApplication.prototype.addRouter = function (router) {
        this.routers.push(router);
        return this;
    };
    ExpressApplication.prototype.addMiddleware = function (middleware) {
        this.middlewares.push(middleware);
        return this;
    };
    ExpressApplication.prototype.configureRoutes = function () {
        var _this = this;
        this.routers.forEach(function (router) {
            router.init(_this);
            var configs = RouteConfigLoader_1.RouteConfigLoader.routeConfigs[router.getBaseUrl()];
            if (configs != null) {
                configs.forEach(function (config) {
                    switch (config.method) {
                        case Method_1.Method.GET:
                            _this.express.get(router.getBaseUrl() + config.endpoint, function (req, res) {
                                config.routeFunction.call(router, req, res, _this.getModel(config.modelName));
                            });
                            break;
                        case Method_1.Method.POST:
                            _this.express.post(router.getBaseUrl() + config.endpoint, function (req, res) {
                                config.routeFunction.call(router, req, res, _this.getModel(config.modelName));
                            });
                            break;
                        case Method_1.Method.PUT:
                            _this.express.put(router.getBaseUrl() + config.endpoint, function (req, res) {
                                config.routeFunction.call(router, req, res, _this.getModel(config.modelName));
                            });
                            break;
                        case Method_1.Method.DELETE:
                            _this.express.delete(router.getBaseUrl() + config.endpoint, function (req, res) {
                                config.routeFunction.call(router, req, res, _this.getModel(config.modelName));
                            });
                            break;
                    }
                });
            }
        });
    };
    ExpressApplication.prototype.configMiddlewares = function () {
        var _this = this;
        new DefaultMiddleware_1.DefaultMiddleware().init(this).configMiddlewares();
        this.middlewares.forEach(function (middleware) {
            middleware.init(_this);
            middleware.configMiddlewares();
        });
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
    return ExpressApplication;
}());
exports.ExpressApplication = ExpressApplication;
//# sourceMappingURL=ExpressApplication.js.map