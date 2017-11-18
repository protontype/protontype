"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Middleware() {
    return function (target, propertyKey, descriptor) {
        target.middlewareFuntion = descriptor.value;
    };
}
exports.Middleware = Middleware;
//# sourceMappingURL=MiddlewareConfig.js.map