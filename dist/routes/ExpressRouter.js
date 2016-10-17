"use strict";
var Express = require('express');
/**
 * @author Humberto Machado
 * Express routes configurations
 */
var ExpressRouter = (function () {
    function ExpressRouter() {
        console.log(">>>> Configured routes to " + this.getBaseUrl() + " <<<<");
    }
    ExpressRouter.prototype.init = function (expressApplication) {
        this.express = expressApplication.getExpress();
        this.router = Express.Router();
        this.express.use(this.getBaseUrl(), this.router);
        this.expressApplication = expressApplication;
    };
    ExpressRouter.prototype.getBaseUrl = function () {
        return this.baseUrl;
    };
    ExpressRouter.prototype.getModelInstances = function () {
        return this.modelInstances;
    };
    ExpressRouter.prototype.sendErrorMessage = function (res, error) {
        res.status(412).json({ msg: error.message });
    };
    ExpressRouter.prototype.getModel = function (modelName) {
        return this.expressApplication.getModel(modelName);
    };
    ExpressRouter.prototype.getRouter = function () {
        return this.router;
    };
    ExpressRouter.prototype.getRouteConfigs = function () {
        return this.routeConfgs;
    };
    ExpressRouter.prototype.addRouteConfig = function (config) {
        if (this.routeConfgs == null) {
            this.routeConfgs = [];
        }
        if (this.routeConfgs.filter(function (route) { return route.method == config.method && route.endpoint == config.endpoint; }).length == 0) {
            this.routeConfgs.push(config);
        }
    };
    return ExpressRouter;
}());
exports.ExpressRouter = ExpressRouter;
//# sourceMappingURL=ExpressRouter.js.map