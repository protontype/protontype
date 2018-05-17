import { ProtonApplication } from '../application/ProtonApplication';
import { ExpressRouter } from '../router/ExpressRouter';
import { RouterFunctionParams } from '../decorators/RouteConfig';
/**
 * Created by Humberto Machado on 14/08/2016.
 */
export declare class TypeORMCrudRouter extends ExpressRouter {
    private useAuth;
    private crudModel;
    init(protonApplication: ProtonApplication): void;
    private addRoute(endpoint, method, routeFunction, useAuth);
    findAll(params: RouterFunctionParams): void;
    create(params: RouterFunctionParams): void;
    findOne(params: RouterFunctionParams): void;
    update(params: RouterFunctionParams): void;
    destroy(params: RouterFunctionParams): void;
}
/**
 * Decorator @UseAuth()
 *
 * Indicates that a BaseCrudRouter uses the authentication middleware
 */
export declare function UseAuth(options?: UseAuthOptions): (constructor: Function) => void;
export interface UseAuthOptions {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}
