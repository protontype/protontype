"use strict";
/**
 * @author Humberto Machado
 */
var RouteConfigLoader = (function () {
    function RouteConfigLoader() {
    }
    RouteConfigLoader.addRouteConfig = function (baseUrl, config) {
        var routeConfigs = this.routeConfigs[baseUrl];
        if (routeConfigs == null) {
            routeConfigs = [];
        }
        if (routeConfigs.filter(function (route) { return route.method == config.method && route.endpoint == config.endpoint; }).length == 0) {
            routeConfigs.push(config);
            this.routeConfigs[baseUrl] = routeConfigs;
        }
    };
    RouteConfigLoader.routeConfigs = {};
    return RouteConfigLoader;
}());
exports.RouteConfigLoader = RouteConfigLoader;
//Decorators
function Route(config) {
    return function (target, propertyKey, descriptor) {
        RouteConfigLoader.addRouteConfig(target.getBaseUrl.apply(this), {
            endpoint: config.endpoint,
            method: config.method,
            routeFunction: descriptor.value,
            modelName: config.modelName
        });
    };
}
exports.Route = Route;
//# sourceMappingURL=RouteConfigLoader.js.map