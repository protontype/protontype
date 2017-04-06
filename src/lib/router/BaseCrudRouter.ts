import { RouterFunctionParams } from './../decorators/RouteConfig';
import { BaseModel } from '../models/BaseModel';
import { ExpressRouter } from '../router/ExpressRouter';
import { ProtonApplication } from './../application/ProtonApplication';
import { Method } from './Method';
import * as express from 'express';
/**
 * Created by Humberto Machado on 14/08/2016.
 */
export abstract class BaseCrudRouter extends ExpressRouter {
    private useAuth: UseAuthOptions;

    public init(protonApplication: ProtonApplication): void {
        super.init(protonApplication);
        this.addRoute('/', Method.GET, this.findAll, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/', Method.POST, this.create, this.useAuth ? this.useAuth.create : false);
        this.addRoute('/:id', Method.GET, this.findOne, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/:id', Method.PUT, this.update, this.useAuth ? this.useAuth.update : false);
        this.addRoute('/:id', Method.DELETE, this.destroy, this.useAuth ? this.useAuth.delete : false);
    }

    private addRoute(endpoint: string, method: Method, routeFunction: Function, useAuth: boolean) {
        this.modelInstances.forEach(modelInstance => {
            let formatedEndpoint: string = endpoint;
            if (this.modelInstances.length > 1) {
                formatedEndpoint = '/' + modelInstance.getModelName().toLowerCase() + endpoint;
            }
            this.addRouteConfig(
                {
                    endpoint: formatedEndpoint,
                    method: method,
                    routeFunction: routeFunction,
                    modelName: modelInstance.getModelName(),
                    useAuth: useAuth
                });
        });
    }

    public findAll(params: RouterFunctionParams) {
        params.model.getInstance().findAll({})
            .then(result => params.res.json(result))
            .catch(error => super.sendErrorMessage(params.res, error));
    }

    public create(params: RouterFunctionParams) {
        params.model.getInstance().create(params.req.body)
            .then(result => params.res.json(result))
            .catch(error => this.sendErrorMessage(params.res, error));
    }

    public findOne(params: RouterFunctionParams) {
        params.model.getInstance().findOne({ where: params.req.params })
            .then(result => {
                if (result) {
                    params.res.json(result);
                } else {
                    params.res.sendStatus(404);
                }
            })
            .catch(error => this.sendErrorMessage(params.res, error));
    }

    public update(params: RouterFunctionParams) {
        params.model.getInstance().update(params.req.body, { where: params.req.params })
            .then(result => params.res.sendStatus(204))
            .catch(error => this.sendErrorMessage(params.res, error));
    }

    public destroy(params: RouterFunctionParams) {
        let ids: string[] = (params.req.params.id as string).split(',');
        params.model.getInstance().destroy({ 
            where: {
                id: {
                    $in: ids
                }
            } 
        })
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