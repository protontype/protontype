import { Method } from "../routes/Method";
/**
 * @author Humberto Machado
 */
export declare class RouteConfigLoader {
    static routesConfigsByUrl: {
        [key: string]: RouteConfig[];
    };
    static addRouteConfig(baseUrl: string, config: RouteConfig): void;
}
export declare function Route(config?: RouteDecoratorParams): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
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
