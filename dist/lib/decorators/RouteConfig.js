"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Humberto Machado
 * Decorator Route({..})
 *
 *  Configute route to express application
 *
 */
function Route(config) {
    return function (target, propertyKey, descriptor) {
        target.addRouteConfig({
            endpoint: config != null ? config.endpoint : null,
            method: config != null ? config.method : null,
            routeFunction: descriptor.value,
            useAuth: config != null ? config.useAuth : false,
            middlewares: config != null ? config.middlewares : null
        });
    };
}
exports.Route = Route;
function RouterClass(config) {
    return function (constructor) {
        constructor.prototype.baseUrl = config.baseUrl;
        constructor.prototype.crudModel = config.model;
        if (config.middlewares) {
            constructor.prototype.routerMiddlewares = config.middlewares;
        }
        else {
            constructor.prototype.routerMiddlewares = [];
        }
    };
}
exports.RouterClass = RouterClass;
//# sourceMappingURL=RouteConfig.js.map