"use strict";
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
            modelName: config != null ? config.modelName : null,
            useAuth: config != null ? config.useAuth : false,
            middlewares: config != null ? config.middlewares : null
        });
    };
}
exports.Route = Route;
function RouterClass(config) {
    return function (constructor) {
        constructor.prototype.baseUrl = config.baseUrl;
        if (config.modelInstances) {
            constructor.prototype.modelInstances = config.modelInstances;
        }
        else {
            constructor.prototype.modelInstances = [];
        }
    };
}
exports.RouterClass = RouterClass;
//# sourceMappingURL=RouteConfig.js.map