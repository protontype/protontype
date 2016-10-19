"use strict";
/**
 * @author Humberto Machado
 */
var Middleware = (function () {
    function Middleware() {
    }
    Middleware.prototype.init = function (expressApplication) {
        this.express = expressApplication.getExpress();
        this.expressApplication = expressApplication;
        return this;
    };
    return Middleware;
}());
exports.Middleware = Middleware;
//# sourceMappingURL=Middleware.js.map