"use strict";
/**
 * @author Humberto Machado
 */
class ProtonMiddleware {
    init(protonApplication) {
        this.express = protonApplication.getExpress();
        this.protonApplication = protonApplication;
        return this;
    }
    configMiddlewares() { }
}
exports.ProtonMiddleware = ProtonMiddleware;
//# sourceMappingURL=ProtonMiddleware.js.map