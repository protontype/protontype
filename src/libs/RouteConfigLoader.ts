import { Method } from '../routes/Method';

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
export function Route(config?: RouteDecoratorParams) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        RouteConfigLoader.addRouteConfig(target.getBaseUrl.apply(this),
            {
                endpoint: config != null ? config.endpoint : null,
                method: config != null ? config.method : null,
                routeFunction: descriptor.value,
                modelName: config != null ? config.modelName : null,
                useAuth: config != null ? config.useAuth : false
            });
    };
}

export function UseAuth() {
    return function (constructor: Function) {
        constructor.prototype.useAuth = true;
    }
}

export interface RouteDecoratorParams {
    endpoint: string;
    method: Method;
    modelName?: string;
    useAuth?: boolean;
}

export interface RouteConfig {
    endpoint?: string;
    method?: Method;
    routeFunction: Function;
    modelName?: string;
    useAuth?: boolean;
}