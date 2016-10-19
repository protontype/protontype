"use strict";
var SequelizeModelConfig_1 = require('../application/SequelizeModelConfig');
var Sequelize = require('sequelize');
/**
 * @author Humberto Machado
 */
var BaseModel = (function () {
    function BaseModel() {
    }
    BaseModel.prototype.getModelName = function () {
        return this.name;
    };
    BaseModel.prototype.defineModel = function (sequelize) {
        this.model = sequelize.define(this.getModelName(), this.definition, {});
        return this;
    };
    BaseModel.prototype.configure = function () {
        //Hook Method
    };
    BaseModel.prototype.configureAssociations = function () {
        var _this = this;
        if (this.associations) {
            this.associations.forEach(function (assoc) {
                switch (assoc.type) {
                    case SequelizeModelConfig_1.AssociationType.HAS_MANY:
                        _this.hasMany(assoc.modelName);
                        break;
                    case SequelizeModelConfig_1.AssociationType.BELONGS_TO:
                        _this.belongsTo(assoc.modelName);
                        break;
                }
            });
        }
    };
    BaseModel.prototype.belongsTo = function (modelName) {
        this.model.belongsTo(this.sequelizeDB.getModel(modelName).getInstance());
    };
    BaseModel.prototype.hasMany = function (modelName) {
        this.model.hasMany(this.sequelizeDB.getModel(modelName).getInstance());
    };
    BaseModel.prototype.getInstance = function () {
        return this.model;
    };
    BaseModel.prototype.setSequelizeDB = function (sequelizeDB) {
        this.sequelizeDB = sequelizeDB;
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
exports.DataTypes = Sequelize;
//# sourceMappingURL=BaseModel.js.map