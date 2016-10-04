"use strict";
var Sequelize = require("sequelize");
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
    BaseModel.prototype.associate = function (sequelizeDB) {
        //Hook Method
    };
    BaseModel.prototype.configure = function (sequelizeDB) {
        //Hook Method
    };
    BaseModel.prototype.getInstance = function () {
        return this.model;
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
exports.DataTypes = Sequelize;
//# sourceMappingURL=BaseModel.js.map