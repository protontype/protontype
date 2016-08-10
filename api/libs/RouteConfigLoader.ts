import {Method} from "../routes/Method";
/**
 * Created by beto_ on 09/08/2016.
 */
export class RouteConfigLoader {
    public static routeConfigs: any = {};

    public static addRouteConfig(baseUrl: string, config: RouteConfig) {
        let routeConfigs: RouteConfig[] = this.routeConfigs[baseUrl];
        if (routeConfigs == null) {
            routeConfigs = [];
        }
        routeConfigs.push(config);
        this.routeConfigs[baseUrl] = routeConfigs;
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