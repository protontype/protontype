"use strict";
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
        this.expressApplication = expressApplication;
    };
    ExpressRouter.prototype.sendErrorMessage = function (res, error) {
        res.status(412).json({ msg: error.message });
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