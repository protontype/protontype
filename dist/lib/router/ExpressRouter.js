"use strict";
const Logger_1 = require("./../application/Logger");
const Express = require("express");
/**
 * @author Humberto Machado
 * Express routes configurations
 */
class ExpressRouter {
    constructor() {
        this.logger = Logger_1.Logger.instance;
    }
    init(expressApplication) {
        this.express = expressApplication.getExpress();
        this.router = Express.Router();
        this.express.use(this.getBaseUrl(), this.router);
        this.expressApplication = expressApplication;
        this.logger.info(`>>>> Configured routes to ${this.getBaseUrl()} <<<<`);
    }
    getBaseUrl() {
        return this.baseUrl;
    }
    getModelInstances() {
        return this.modelInstances;
    }
    sendErrorMessage(res, error) {
        res.status(412).json({ msg: error.message });
    }
    getModel(modelName) {
        return this.expressApplication.getModel(modelName);
    }
    getRouter() {
        return this.router;
    }
    getRouteConfigs() {
        return this.routeConfgs;
    }
    addRouteConfig(config) {
        if (this.routeConfgs == null) {
            this.routeConfgs = [];
        }
        if (this.routeConfgs.filter(route => route.method == config.method && route.endpoint == config.endpoint).length == 0) {
            this.routeConfgs.push(config);
        }
    }
}
exports.ExpressRouter = ExpressRouter;
//# sourceMappingURL=ExpressRouter.js.map