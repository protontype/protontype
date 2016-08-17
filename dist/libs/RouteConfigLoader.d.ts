import { Method } from "../routes/Method";
/**
 * @author Humberto Machado
 */
export declare class RouteConfigLoader {
    static routeConfigs: any;
    static addRouteConfig(baseUrl: string, config: RouteConfig): void;
}
export declare function Route(config: {
    endpoint: string;
    method: Method;
    modelName?: string;
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export interface RouteConfig {
    endpoint: string;
    method: Method;
    routeFunction: Function;
    modelName?: string;
}
