"use strict";
const Logger_1 = require("./Logger");
const Sequelize = require("sequelize");
const typescript_collections_1 = require("typescript-collections");
/**
 * @author Humberto Machado
 */
class SequelizeDB {
    constructor(config) {
        this.sequelize = null;
        this.models = new typescript_collections_1.Dictionary();
        this.logger = Logger_1.Logger.instance;
        if (this.sequelize == null) {
            this.sequelize = new Sequelize(config.name, config.username, config.password, config.options);
        }
    }
    loadModels(modelsList) {
        modelsList.forEach((model) => {
            if (!this.getModel(model.getModelName())) {
                this.addModel(model.getModelName(), model.defineModel(this.sequelize));
                model.setSequelizeDB(this);
                this.logger.info(`Model loaded: ${model.getModelName()}`);
            }
        });
        modelsList.forEach((model) => {
            model.configureAssociations();
            model.configure();
        });
        return this;
    }
    getInstance() {
        return this.sequelize;
    }
    getModels() {
        return this.models;
    }
    getModel(modelName) {
        return this.models.getValue(modelName);
    }
    addModel(name, model) {
        this.models.setValue(name, model);
    }
}
exports.SequelizeDB = SequelizeDB;
//# sourceMappingURL=SequelizeDB.js.map