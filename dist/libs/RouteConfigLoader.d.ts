import { Method } from '../routes/Method';
/**
 * @author Humberto Machado
 */
export declare class RouteConfigLoader {
    static routesConfigsByUrl: {
        [key: string]: RouteConfig[];
    };
    static addRouteConfig(baseUrl: string, config: RouteConfig): void;
}
/**
 * Decorator Route({..})
 *
 *  Configute route to express application
 *
 */
export declare function Route(config?: RouteDecoratorParams): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * @param endpoint Route endpoint
 * @param method HTTP method (POST, GET, PUT ...
 * @param modelName Model's name used in route. Optional
 * @param useAuth Indicates if use authentications middleware in route
 */
export interface RouteDecoratorParams {
    endpoint: string;
    method: Method;
    modelName?: string;
    useAuth?: boolean;
}
/**
 * @param endpoint Route endpoint
 * @param method HTTP method (POST, GET, PUT ...
 * @param routeFunction Function that contains business rules of route
 * @param modelName Model's name used in route. Optional
 * @param useAuth Indicates if use authentications middleware in route
 */
export interface RouteConfig {
    endpoint?: string;
    method?: Method;
    routeFunction: Function;
    modelName?: string;
    useAuth?: boolean;
}
