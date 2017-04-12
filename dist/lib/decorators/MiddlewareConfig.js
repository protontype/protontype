"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Middleware(config) {
    return function (target, propertyKey, descriptor) {
        target.middlewareFuntion = descriptor.value;
        if (config) {
            target.modelName = config.modelName;
        }
    };
}
exports.Middleware = Middleware;
//# sourceMappingURL=MiddlewareConfig.js.map