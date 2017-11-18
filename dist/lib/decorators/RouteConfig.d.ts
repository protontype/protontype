import { ProtonApplication } from './../application/ProtonApplication';
import { ExpressRouter } from '../router/ExpressRouter';
import { Method } from '../router/Method';
import { ProtonMiddleware } from "../middlewares/ProtonMiddleware";
import * as express from 'express';
/**
 * @author Humberto Machado
 * Decorator Route({..})
 *
 *  Configute route to express application
 *
 */
export declare function Route(config?: RouteDecoratorParams): (target: ExpressRouter, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function RouterClass(config: RouterConfig): (constructor: Function) => void;
/**
 *@RouterClass decorator configs
 */
export interface RouterConfig {
    baseUrl: string;
    middlewares?: ProtonMiddleware[];
    model?: Function;
}
/**
 * @Router method decorator config
 * @param endpoint Route endpoint
 * @param method HTTP method (POST, GET, PUT ...
 * @param modelName Model's name used in route. Optional
 * @param useAuth Indicates if use authentications middleware in route
 */
export interface RouteDecoratorParams {
    endpoint: string;
    method: Method;
    useAuth?: boolean;
    middlewares?: ProtonMiddleware[];
}
/**
 * Object that contains information of one route method.
 * Used to define routes array in ExpressRouter
 *
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
    useAuth?: boolean;
    middlewares?: ProtonMiddleware[];
}
export interface RouterFunctionParams {
    req: express.Request;
    res: express.Response;
    app: ProtonApplication;
}
