"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Middleware(autoNext) {
    return function (target, propertyKey, descriptor) {
        target.middlewareFuntion = descriptor.value;
        target.autoNext = autoNext;
    };
}
exports.Middleware = Middleware;
//# sourceMappingURL=MiddlewareConfig.js.map