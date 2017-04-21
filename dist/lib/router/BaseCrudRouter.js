"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressRouter_1 = require("../router/ExpressRouter");
const Method_1 = require("./Method");
/**
 * Created by Humberto Machado on 14/08/2016.
 */
class BaseCrudRouter extends ExpressRouter_1.ExpressRouter {
    init(protonApplication) {
        super.init(protonApplication);
        this.addRoute('/', Method_1.Method.GET, this.findAll, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/', Method_1.Method.POST, this.create, this.useAuth ? this.useAuth.create : false);
        this.addRoute('/:id', Method_1.Method.GET, this.findOne, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/:id', Method_1.Method.PUT, this.update, this.useAuth ? this.useAuth.update : false);
        this.addRoute('/:id', Method_1.Method.DELETE, this.destroy, this.useAuth ? this.useAuth.delete : false);
    }
    addRoute(endpoint, method, routeFunction, useAuth) {
        this.modelInstances.forEach(modelInstance => {
            let formatedEndpoint = endpoint;
            if (this.modelInstances.length > 1) {
                formatedEndpoint = '/' + modelInstance.getModelName().toLowerCase() + endpoint;
            }
            this.addRouteConfig({
                endpoint: formatedEndpoint,
                method: method,
                routeFunction: routeFunction,
                modelName: modelInstance.getModelName(),
                useAuth: useAuth
            });
        });
    }
    findAll(params) {
        params.model.getInstance().findAll({})
            .then(result => params.res.send(result))
            .catch(error => super.sendErrorMessage(params.res, error));
    }
    create(params) {
        params.model.getInstance().create(params.req.body)
            .then(result => params.res.send(result))
            .catch(error => this.sendErrorMessage(params.res, error));
    }
    findOne(params) {
        params.model.getInstance().findOne({ where: params.req.params })
            .then(result => {
            if (result) {
                params.res.send(result);
            }
            else {
                params.res.sendStatus(404);
            }
        })
            .catch(error => this.sendErrorMessage(params.res, error));
    }
    update(params) {
        params.model.getInstance().update(params.req.body, { where: params.req.params })
            .then(result => params.res.sendStatus(204))
            .catch(error => this.sendErrorMessage(params.res, error));
    }
    destroy(params) {
        let ids = params.req.params.id.split(',');
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
exports.BaseCrudRouter = BaseCrudRouter;
/**
 * Decorator @UseAuth()
 *
 * Indicates that a BaseCrudRouter uses the authentication middleware
 */
function UseAuth(options) {
    return function (constructor) {
        if (options) {
            constructor.prototype.useAuth = options;
        }
        else {
            constructor.prototype.useAuth = { create: true, update: true, read: true, delete: true };
        }
    };
}
exports.UseAuth = UseAuth;
//# sourceMappingURL=BaseCrudRouter.js.map