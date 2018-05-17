import { ProtonApplication } from './../application/ProtonApplication';
import { BaseRouter } from '../router/BaseRouter';
import { Method } from '../router/Method';
import { BaseMiddleware } from "../middlewares/BaseMiddleware";
import express from 'express';

/**
 * @author Humberto Machado
 * Decorator Route({..})
 * 
 *  Configute route to express application 
 *
 */
export function Route(config?: RouteDecoratorParams) {
    return function (target: BaseRouter, propertyKey: string, descriptor: PropertyDescriptor) {
        target.addRouteConfig(
            {
                endpoint: config != null ? config.endpoint : null,
                method: config != null ? config.method : null,
                routeFunction: descriptor.value,
                useAuth: config != null ? config.useAuth : false,
                middlewares: config != null ? config.middlewares : null
            });
    };
}

export function RouterClass(config: RouterConfig) {
    return function (constructor: Function) {
        constructor.prototype.baseUrl = config.baseUrl;
        constructor.prototype.crudModel = config.model;
        if (config.middlewares) {
            constructor.prototype.routerMiddlewares = config.middlewares;
        } else {
            constructor.prototype.routerMiddlewares = [];
        }
    }
}

/**
 *@RouterClass decorator configs
 */
export interface RouterConfig {
    baseUrl: string;
    middlewares?: BaseMiddleware[];
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
    middlewares?: BaseMiddleware[];
}

/**
 * Object that contains information of one route method.
 * Used to define routes array in BaseRouter
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
    middlewares?: BaseMiddleware[];
}

export interface RouterFunctionParams {
    req: express.Request,
    res: express.Response,
    app: ProtonApplication
}