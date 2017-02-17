"use strict";
/**
 * @author Humberto Machado
 */
class Middleware {
    init(protonApplication) {
        this.express = protonApplication.getExpress();
        this.protonApplication = protonApplication;
        return this;
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=Middleware.js.map