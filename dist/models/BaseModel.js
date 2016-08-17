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
        this.model = sequelize.define(this.getModelName(), this.definition, {});
        return this.model;
    };
    BaseModel.prototype.associate = function (sequelizeDB) {
        //Hook Method
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map