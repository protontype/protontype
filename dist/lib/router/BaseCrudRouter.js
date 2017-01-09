"use strict";
const ExpressRouter_1 = require("../router/ExpressRouter");
const Method_1 = require("./Method");
/**
 * Created by beto_ on 14/08/2016.
 */
class BaseCrudRouter extends ExpressRouter_1.ExpressRouter {
    init(expressApplication) {
        super.init(expressApplication);
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
    findAll(req, res, model) {
        model.getInstance().findAll({})
            .then(result => res.json(result))
            .catch(error => super.sendErrorMessage(res, error));
    }
    create(req, res, model) {
        model.getInstance().create(req.body)
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error));
    }
    findOne(req, res, model) {
        model.getInstance().findOne({ where: req.params })
            .then(result => {
            if (result) {
                res.json(result);
            }
            else {
                res.sendStatus(404);
            }
        })
            .catch(error => this.sendErrorMessage(res, error));
    }
    update(req, res, model) {
        model.getInstance().update(req.body, { where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }
    destroy(req, res, model) {
        let ids = req.params.id.split(',');
        model.getInstance().destroy({
            where: {
                id: {
                    $in: ids
                }
            }
        })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
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