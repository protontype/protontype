import { plainToClass } from 'class-transformer';

import { ProtonApplication } from '../application/ProtonApplication';
import { BaseRouter } from '../router/BaseRouter';
import { Method } from '../router/Method';
import { RouterFunctionParams } from '../decorators/RouteConfig';
import { BodyParserMiddleware } from '../middlewares/BodyParserMiddleware';
import { Database } from '../database/DefaultDBConnector';

/**
 * Created by Humberto Machado on 14/08/2016.
 */
export class CrudRouter extends BaseRouter {
    private useAuth: UseAuthOptions;
    private crudModel: {
        new(...args: any[]);
    };

    public init(protonApplication: ProtonApplication): void {
        super.init(protonApplication);
        this.addRoute('/', Method.GET, this.findAll, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/', Method.POST, this.create, this.useAuth ? this.useAuth.create : false);
        this.addRoute('/:id', Method.GET, this.findOne, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/:id', Method.PUT, this.update, this.useAuth ? this.useAuth.update : false);
        this.addRoute('/:id', Method.DELETE, this.destroy, this.useAuth ? this.useAuth.delete : false);
    }

    private addRoute(endpoint: string, method: Method, routeFunction: Function, useAuth: boolean) {
        this.addRouteConfig(
            {
                endpoint: endpoint,
                method: method,
                routeFunction: routeFunction,
                useAuth: useAuth,
                middlewares: [new BodyParserMiddleware()]
            });
    }

    public findAll(params: RouterFunctionParams) {
        Database.getBD().getRepository(this.crudModel)
            .find().then(result => params.res.send(result))
            .catch(error => super.sendErrorMessage(params.res, error));
    }

    public create(params: RouterFunctionParams) {
        Database.getBD().getRepository(this.crudModel).save(plainToClass(this.crudModel, JSON.parse(params.req.body)))
            .then(result => params.res.send(result))
            .catch(error => this.sendErrorMessage(params.res, error));
    }

    public findOne(params: RouterFunctionParams) {
        Database.getBD().getRepository(this.crudModel).findOne({ where: params.req.params })
            .then(result => {
                if (result) {
                    params.res.send(result);
                } else {
                    params.res.sendStatus(404);
                }
            })
            .catch(error => this.sendErrorMessage(params.res, error));
    }

    public update(params: RouterFunctionParams) {
        Database.getBD().getRepository(this.crudModel).update(params.req.params, JSON.parse(params.req.body))
            .then(result => { params.res.sendStatus(204); })
            .catch(error => this.sendErrorMessage(params.res, error));
    }

    public destroy(params: RouterFunctionParams) {
        let ids: string[] = (params.req.params.id as string).split(',');
        Database.getBD().getRepository(this.crudModel).removeByIds(ids)
            .then(result => params.res.sendStatus(204))
            .catch(error => this.sendErrorMessage(params.res, error));
    }
}

/**
 * Decorator @UseAuth()
 * 
 * Indicates that a BaseCrudRouter uses the authentication middleware
 */
export function UseAuth(options?: UseAuthOptions) {
    return function (constructor: Function) {
        if (options) {
            constructor.prototype.useAuth = options;
        } else {
            constructor.prototype.useAuth = { create: true, update: true, read: true, delete: true }
        }
    }
}

export interface UseAuthOptions {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}