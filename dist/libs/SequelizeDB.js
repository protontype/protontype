"use strict";
var Config_1 = require("./Config");
var Sequelize = require("sequelize");
var SequelizeModelLoader_1 = require("./SequelizeModelLoader");
/**
 * @author Humberto Machado
 */
var SequelizeDB = (function () {
    function SequelizeDB() {
        this.sequelize = null;
        this.models = {};
        if (this.sequelize == null) {
            this.sequelize = new Sequelize(Config_1.Config.database.name, Config_1.Config.database.username, Config_1.Config.database.password, Config_1.Config.database.params);
            SequelizeModelLoader_1.SequelizeModelLoader.loadModels(this);
        }
    }
    SequelizeDB.prototype.getDB = function () {
        return {
            sequelize: this.sequelize,
            Sequelize: Sequelize
        };
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