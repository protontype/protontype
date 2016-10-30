import { ExpressRouter } from './ExpressRouter';
import { Method } from './Method';
import { BaseModel } from "../models/BaseModel";
/**
 * @author Humberto Machado
 * Decorator Route({..})
 *
 *  Configute route to express application
 *
 */
export declare function Route(config?: RouteDecoratorParams): (target: ExpressRouter, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function RouterClass(config: RouterConfig): (constructor: Function) => void;
export interface RouterConfig {
    baseUrl: string;
    modelInstances?: BaseModel<any>[];
}
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
