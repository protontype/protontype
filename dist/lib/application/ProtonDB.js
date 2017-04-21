"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
const Sequelize = require("sequelize");
const typescript_collections_1 = require("typescript-collections");
/**
 * @author Humberto Machado
 */
class ProtonDB {
    constructor(config) {
        this.sequelize = null;
        this.models = new typescript_collections_1.Dictionary();
        this.logger = Logger_1.Logger.instance;
        if (this.sequelize == null && config) {
            this.sequelize = new Sequelize(config.name, config.username, config.password, config.options);
        }
    }
    loadModels(modelsList) {
        if (modelsList && this.sequelize) {
            modelsList.forEach((model) => {
                if (!this.getModel(model.getModelName())) {
                    this.addModel(model.getModelName(), model.defineModel(this.sequelize));
                    model.setProtonDB(this);
                    this.logger.info(`Model loaded: ${model.getModelName()}`);
                }
            });
            modelsList.forEach((model) => {
                model.configureAssociations();
                model.configure();
            });
        }
        return this;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sequelize) {
                return this.sequelize.sync();
            }
        });
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
exports.ProtonDB = ProtonDB;
//# sourceMappingURL=ProtonDB.js.map