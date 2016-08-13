import {Method} from "../routes/Method";

/**
 * @author Humberto Machado
 */
export class RouteConfigLoader {
    public static routeConfigs: any = {};

    public static addRouteConfig(baseUrl: string, config: RouteConfig) {
        let routeConfigs: RouteConfig[] = this.routeConfigs[baseUrl];
        if (routeConfigs == null) {
            routeConfigs = [];
        }

        if (routeConfigs.filter(route => route.method == config.method && route.endpoint == config.endpoint).length == 0) {
            routeConfigs.push(config);
            this.routeConfigs[baseUrl] = routeConfigs;
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