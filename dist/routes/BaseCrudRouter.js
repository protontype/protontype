"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExpressRouter_1 = require("../routes/ExpressRouter");
var RouteConfigLoader_1 = require("../libs/RouteConfigLoader");
var Method_1 = require("./Method");
/**
 * Created by beto_ on 14/08/2016.
 */
var BaseCrudRouter = (function (_super) {
    __extends(BaseCrudRouter, _super);
    function BaseCrudRouter() {
        _super.call(this);
        this.addRoute(this.getBaseUrl(), '/', Method_1.Method.GET, this.findAll);
        this.addRoute(this.getBaseUrl(), '/', Method_1.Method.POST, this.create);
        this.addRoute(this.getBaseUrl(), '/:id', Method_1.Method.GET, this.findOne);
        this.addRoute(this.getBaseUrl(), '/:id', Method_1.Method.PUT, this.update);
        this.addRoute(this.getBaseUrl(), '/:id', Method_1.Method.DELETE, this.destroy);
    }
    BaseCrudRouter.prototype.addRoute = function (baseUrl, endpoint, method, routeFunction) {
        this.getModelInstances().forEach(function (modelInstance) {
            RouteConfigLoader_1.RouteConfigLoader.addRouteConfig(baseUrl, {
                endpoint: endpoint,
                method: method,
                routeFunction: routeFunction,
                modelName: modelInstance.getModelName()
            });
        });
    };
    BaseCrudRouter.prototype.findAll = function (req, res, model) {
        var _this = this;
        model.find({})
            .then(function (result) { return res.json(result); })
            .catch(function (error) { return _super.prototype.sendErrorMessage.call(_this, res, error); });
    };
    BaseCrudRouter.prototype.create = function (req, res, model) {
        var _this = this;
        model.create(req.body)
            .then(function (result) { return res.json(result); })
            .catch(function (error) { return _this.sendErrorMessage(res, error); });
    };
    BaseCrudRouter.prototype.findOne = function (req, res, model) {
        var _this = this;
        model.findOne({ where: req.params })
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
        model.update(req.body, { where: req.params })
            .then(function (result) { return res.sendStatus(204); })
            .catch(function (error) { return _this.sendErrorMessage(res, error); });
    };
    BaseCrudRouter.prototype.destroy = function (req, res, model) {
        var _this = this;
        model.destroy({ where: req.params })
            .then(function (result) { return res.sendStatus(204); })
            .catch(function (error) { return _this.sendErrorMessage(res, error); });
    };
    return BaseCrudRouter;
}(ExpressRouter_1.ExpressRouter));
exports.BaseCrudRouter = BaseCrudRouter;
//# sourceMappingURL=BaseCrudRouter.js.map