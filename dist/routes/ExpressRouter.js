"use strict";
var Express = require("express");
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
    ExpressRouter.prototype.sendErrorMessage = function (res, error) {
        res.status(412).json({ msg: error.message });
    };
    ExpressRouter.prototype.getModel = function (modelName) {
        return this.expressApplication.getModel(modelName);
    };
    ExpressRouter.prototype.getRouter = function () {
        return this.router;
    };
    return ExpressRouter;
}());
exports.ExpressRouter = ExpressRouter;
function Router(config) {
    return function (constructor) {
        constructor.prototype.baseUrl = config.baseUrl;
    };
}
exports.Router = Router;
//# sourceMappingURL=ExpressRouter.js.map