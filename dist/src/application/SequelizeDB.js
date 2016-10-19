"use strict";
var Sequelize = require('sequelize');
var typescript_collections_1 = require('typescript-collections');
/**
 * @author Humberto Machado
 */
var SequelizeDB = (function () {
    function SequelizeDB(config) {
        this.sequelize = null;
        this.models = new typescript_collections_1.Dictionary();
        if (this.sequelize == null) {
            this.sequelize = new Sequelize(config.name, config.username, config.password, config.options);
        }
    }
    SequelizeDB.prototype.loadModels = function (modelsList) {
        var _this = this;
        modelsList.forEach(function (model) {
            _this.addModel(model.getModelName(), model.defineModel(_this.sequelize));
            model.setSequelizeDB(_this);
            console.log("Model loaded: " + model.getModelName());
        });
        modelsList.forEach(function (model) {
            model.configureAssociations();
            model.configure();
        });
        return this;
    };
    SequelizeDB.prototype.getInstance = function () {
        return this.sequelize;
    };
    SequelizeDB.prototype.getModels = function () {
        return this.models;
    };
    SequelizeDB.prototype.getModel = function (modelName) {
        return this.models.getValue(modelName);
    };
    SequelizeDB.prototype.addModel = function (name, model) {
        this.models.setValue(name, model);
    };
    return SequelizeDB;
}());
exports.SequelizeDB = SequelizeDB;
//# sourceMappingURL=SequelizeDB.js.map