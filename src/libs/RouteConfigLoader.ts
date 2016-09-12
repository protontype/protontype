import {Method} from "../routes/Method";
import {ExpressRouter} from "../routes/ExpressRouter";

/**
 * @author Humberto Machado
 */
export class RouteConfigLoader {
    public static routesConfigsByUrl: { [key: string]: RouteConfig[] } = {};

    public static addRouteConfig(baseUrl: string, config: RouteConfig) {
        let routes: RouteConfig[] = this.routesConfigsByUrl[baseUrl];
        if (routes == null) {
            routes = [];
        }

        if (routes.filter(route => route.method == config.method && route.endpoint == config.endpoint).length == 0) {
            routes.push(config);
            this.routesConfigsByUrl[baseUrl] = routes;
        }
    }
}

//Decorators
export function Route(config: {endpoint: string, method: Method, modelName?: string}) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        RouteConfigLoader.addRouteConfig(target.getBaseUrl.apply(this),
            {
                endpoint: config.endpoint,
                method: config.method,
                routeFunction: descriptor.value,
                modelName: config.modelName
            });
    };
}

export interface RouteConfig {
    endpoint: string;
    method: Method;
    routeFunction: Function;
    modelName?: string;
}