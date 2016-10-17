import * as console from 'console';
import { ExpressRouter } from '../routes/ExpressRouter';
import { Method } from '../routes/Method';
import { BaseModel } from "../models/BaseModel"

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
                useAuth: config != null ? config.useAuth : false
            });
    };
}

export function RouterClass(config: RouterConfig) {
    return function (constructor: Function) {
        constructor.prototype.baseUrl = config.baseUrl;
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