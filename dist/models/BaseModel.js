"use strict";
/**
 * @author Humberto Machado
 */
var BaseModel = (function () {
    function BaseModel() {
    }
    BaseModel.prototype.getModelName = function () {
        return this.name;
    };
    BaseModel.prototype.defineModel = function (sequelize, DataTypes) {
        this.nativeInstance = sequelize.define(this.getModelName(), this.definition, {});
        return this;
    };
    BaseModel.prototype.associate = function (sequelizeDB) {
        //Hook Method
    };
    BaseModel.prototype.getNativeInstance = function () {
        return this.nativeInstance;
    };
    BaseModel.prototype.find = function (params) {
        return this.nativeInstance.findAll(params);
    };
    BaseModel.prototype.create = function (object) {
        return this.nativeInstance.create(object);
    };
    BaseModel.prototype.findOne = function (params) {
        return this.nativeInstance.findOne(params);
    };
    BaseModel.prototype.update = function (object, params) {
        return this.nativeInstance.update(object, params);
    };
    BaseModel.prototype.destroy = function (params) {
        return this.nativeInstance.destroy(params);
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map