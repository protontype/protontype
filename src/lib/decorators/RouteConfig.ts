import { ProtonApplication } from './../application/ProtonApplication';
import { ExpressRouter } from '../router/ExpressRouter';
import { Method } from '../router/Method';
import { BaseModel } from "../models/BaseModel"
import { ProtonMiddleware } from "../middlewares/ProtonMiddleware";
import * as express from 'express';

/**
 * @author Humberto Machado
 * Decorator Route({..})
 * 
 *  Configute route to express application 
 *
 */
export function Route(config?: RouteDecoratorParams) {
    return function (target: ExpressRouter, propertyKey: string, descriptor: PropertyDescriptor) {
        target.addRouteConfig(
            {
                endpoint: config != null ? config.endpoint : null,
                method: config != null ? config.method : null,
                routeFunction: descriptor.value,
                modelName: config != null ? config.modelName : null,
                useAuth: config != null ? config.useAuth : false,
                middlewares: config != null ? config.middlewares : null
            });
    };
}

export function RouterClass(config: RouterConfig) {
    return function (constructor: Function) {
        constructor.prototype.baseUrl = config.baseUrl;
        if (config.middlewares) {
            constructor.prototype.routerMiddlewares = config.middlewares;
        } else {
            constructor.prototype.routerMiddlewares = [];
        }

        if (config.modelInstances) {
            constructor.prototype.modelInstances = config.modelInstances;
        } else {
            constructor.prototype.modelInstances = [];
        }
    }
}

export interface RouterConfig {
    baseUrl: string;
    modelInstances?: BaseModel<any>[];
    middlewares?: ProtonMiddleware[];
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
    middlewares?: ProtonMiddleware[];
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
    middlewares?: ProtonMiddleware[];
}

export interface RouterFunctionParams {
    req: express.Request,
    res: express.Response,
    model: BaseModel<any>,
    app: ProtonApplication
}