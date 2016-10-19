"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExpressRouter_1 = require('../router/ExpressRouter');
var Method_1 = require('./Method');
/**
 * Created by beto_ on 14/08/2016.
 */
var BaseCrudRouter = (function (_super) {
    __extends(BaseCrudRouter, _super);
    function BaseCrudRouter() {
        _super.apply(this, arguments);
    }
    BaseCrudRouter.prototype.init = function (expressApplication) {
        _super.prototype.init.call(this, expressApplication);
        this.addRoute('/', Method_1.Method.GET, this.findAll, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/', Method_1.Method.POST, this.create, this.useAuth ? this.useAuth.create : false);
        this.addRoute('/:id', Method_1.Method.GET, this.findOne, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/:id', Method_1.Method.PUT, this.update, this.useAuth ? this.useAuth.update : false);
        this.addRoute('/:id', Method_1.Method.DELETE, this.destroy, this.useAuth ? this.useAuth.delete : false);
    };
    BaseCrudRouter.prototype.addRoute = function (endpoint, method, routeFunction, useAuth) {
        var _this = this;
        this.modelInstances.forEach(function (modelInstance) {
            _this.addRouteConfig({
                endpoint: endpoint,
                method: method,
                routeFunction: routeFunction,
                modelName: modelInstance.getModelName(),
                useAuth: useAuth
            });
        });
    };
    BaseCrudRouter.prototype.findAll = function (req, res, model) {
        var _this = this;
        model.getInstance().findAll({})
            .then(function (result) { return res.json(result); })
            .catch(function (error) { return _super.prototype.sendErrorMessage.call(_this, res, error); });
    };
    BaseCrudRouter.prototype.create = function (req, res, model) {
        var _this = this;
        model.getInstance().create(req.body)
            .then(function (result) { return res.json(result); })
            .catch(function (error) { return _this.sendErrorMessage(res, error); });
    };
    BaseCrudRouter.prototype.findOne = function (req, res, model) {
        var _this = this;
        model.getInstance().findOne({ where: req.params })
            .then(function (result) {
            if (result) {
                res.json(result);
            }
            else {
                res.sendStatus(404);
            }
        })
            .catch(function (error) { return _this.sendErrorMessage(res, error); });
    };
    BaseCrudRouter.prototype.update = function (req, res, model) {
        var _this = this;
        model.getInstance().update(req.body, { where: req.params })
            .then(function (result) { return res.sendStatus(204); })
            .catch(function (error) { return _this.sendErrorMessage(res, error); });
    };
    BaseCrudRouter.prototype.destroy = function (req, res, model) {
        var _this = this;
        model.getInstance().destroy({ where: req.params })
            .then(function (result) { return res.sendStatus(204); })
            .catch(function (error) { return _this.sendErrorMessage(res, error); });
    };
    return BaseCrudRouter;
}(ExpressRouter_1.ExpressRouter));
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