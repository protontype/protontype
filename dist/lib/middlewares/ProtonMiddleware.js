"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Humberto Machado
 */
class ProtonMiddleware {
    constructor(autoNext) {
        if (autoNext) {
            this.autoNext = autoNext;
        }
    }
    init(protonApplication) {
        this.express = protonApplication.getExpress();
        this.protonApplication = protonApplication;
        return this;
    }
    configMiddlewares() { }
}
exports.ProtonMiddleware = ProtonMiddleware;
//# sourceMappingURL=ProtonMiddleware.js.map