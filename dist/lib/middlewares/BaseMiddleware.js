"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Humberto Machado
 */
class BaseMiddleware {
    init(protonApplication) {
        this.express = protonApplication.getExpress();
        this.protonApplication = protonApplication;
        return this;
    }
    configMiddlewares() { }
}
exports.BaseMiddleware = BaseMiddleware;
//# sourceMappingURL=BaseMiddleware.js.map