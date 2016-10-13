import { RouteConfigLoader } from '../libs/RouteConfigLoader';
import { BaseModel } from '../models/BaseModel';
import { ExpressRouter } from '../routes/ExpressRouter';
import { Method } from './Method';
/**
 * Created by beto_ on 14/08/2016.
 */
export abstract class BaseCrudRouter extends ExpressRouter {
    private useAuth: boolean;

    constructor() {
        super();
        this.addRoute(this.getBaseUrl(), '/', Method.GET, this.findAll, this.useAuth);
        this.addRoute(this.getBaseUrl(), '/', Method.POST, this.create, false);
        this.addRoute(this.getBaseUrl(), '/:id', Method.GET, this.findOne, this.useAuth);
        this.addRoute(this.getBaseUrl(), '/:id', Method.PUT, this.update, this.useAuth);
        this.addRoute(this.getBaseUrl(), '/:id', Method.DELETE, this.destroy, this.useAuth);
    }

    private addRoute(baseUrl: string, endpoint: string, method: Method, routeFunction: Function, useAuth: boolean) {
        this.getModelInstances().forEach(modelInstance => {
            RouteConfigLoader.addRouteConfig(baseUrl,
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
export function UseAuth() {
    return function (constructor: Function) {
        constructor.prototype.useAuth = true;
    }
}