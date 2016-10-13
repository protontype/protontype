"use strict";
var Config_1 = require('./Config');
var SequelizeModelLoader_1 = require('./SequelizeModelLoader');
var Sequelize = require('sequelize');
/**
 * @author Humberto Machado
 */
var SequelizeDB = (function () {
    function SequelizeDB() {
        this.sequelize = null;
        this.models = {};
        if (this.sequelize == null) {
            this.sequelize = new Sequelize(Config_1.Config.database.name, Config_1.Config.database.username, Config_1.Config.database.password, Config_1.Config.database.options);
            SequelizeModelLoader_1.SequelizeModelLoader.loadModels(this);
        }
    }
    SequelizeDB.prototype.getInstance = function () {
        return this.sequelize;
    };
    SequelizeDB.prototype.getModels = function () {
        return this.models;
    };
    SequelizeDB.prototype.getModel = function (modelName) {
        return this.models[modelName];
    };
    SequelizeDB.prototype.addModel = function (name, model) {
        this.models[name] = model;
    };
    return SequelizeDB;
}());
exports.SequelizeDB = SequelizeDB;
//# sourceMappingURL=SequelizeDB.js.map