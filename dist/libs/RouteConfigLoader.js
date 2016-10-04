"use strict";
/**
 * @author Humberto Machado
 */
var RouteConfigLoader = (function () {
    function RouteConfigLoader() {
    }
    RouteConfigLoader.addRouteConfig = function (baseUrl, config) {
        var routes = this.routesConfigsByUrl[baseUrl];
        if (routes == null) {
            routes = [];
        }
        if (routes.filter(function (route) { return route.method == config.method && route.endpoint == config.endpoint; }).length == 0) {
            routes.push(config);
            this.routesConfigsByUrl[baseUrl] = routes;
        }
    };
    RouteConfigLoader.routesConfigsByUrl = {};
    return RouteConfigLoader;
}());
exports.RouteConfigLoader = RouteConfigLoader;
//Decorators
function Route(config) {
    return function (target, propertyKey, descriptor) {
        RouteConfigLoader.addRouteConfig(target.getBaseUrl.apply(this), {
            endpoint: config != null ? config.endpoint : null,
            method: config != null ? config.method : null,
            routeFunction: descriptor.value,
            modelName: config != null ? config.modelName : null,
            useAuth: config != null ? config.useAuth : false
        });
    };
}
exports.Route = Route;
//# sourceMappingURL=RouteConfigLoader.js.map