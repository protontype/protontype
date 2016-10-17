import { BaseModel } from '../models/BaseModel';
import { ExpressRouter } from '../routes/ExpressRouter';
import { ExpressApplication } from './../libs/ExpressApplication';
import { Method } from './Method';
/**
 * Created by beto_ on 14/08/2016.
 */
export abstract class BaseCrudRouter extends ExpressRouter {
    private useAuth: UseAuthOptions;

    public init(expressApplication: ExpressApplication): void {
        super.init(expressApplication);
        this.addRoute('/', Method.GET, this.findAll, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/', Method.POST, this.create, this.useAuth ? this.useAuth.create : false);
        this.addRoute('/:id', Method.GET, this.findOne, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/:id', Method.PUT, this.update, this.useAuth ? this.useAuth.update : false);
        this.addRoute('/:id', Method.DELETE, this.destroy, this.useAuth ? this.useAuth.delete : false);
    }

    private addRoute(endpoint: string, method: Method, routeFunction: Function, useAuth: boolean) {
        this.modelInstances.forEach(modelInstance => {
            this.addRouteConfig(
                {
                    endpoint: endpoint,
                    method: method,
                    routeFunction: routeFunction,
                    modelName: modelInstance.getModelName(),
                    useAuth: useAuth
                });
        });
    }

    public findAll(req, res, model: BaseModel<any>) {
        model.getInstance().findAll({})
            .then(result => res.json(result))
            .catch(error => super.sendErrorMessage(res, error));
    }

    public create(req, res, model: BaseModel<any>) {
        model.getInstance().create(req.body)
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error));
    }

    public findOne(req, res, model: BaseModel<any>) {
        model.getInstance().findOne({ where: req.params })
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => this.sendErrorMessage(res, error));
    }

    public update(req, res, model: BaseModel<any>) {
        model.getInstance().update(req.body, { where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }

    public destroy(req, res, model: BaseModel<any>) {
        model.getInstance().destroy({ where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
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