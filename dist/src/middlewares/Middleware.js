"use strict";
/**
 * @author Humberto Machado
 */
class Middleware {
    init(expressApplication) {
        this.express = expressApplication.getExpress();
        this.expressApplication = expressApplication;
        return this;
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=Middleware.js.map