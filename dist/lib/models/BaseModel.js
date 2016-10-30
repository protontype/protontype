"use strict";
const SequelizeModelConfig_1 = require('../application/SequelizeModelConfig');
const Sequelize = require('sequelize');
/**
 * @author Humberto Machado
 */
class BaseModel {
    getModelName() {
        return this.name;
    }
    defineModel(sequelize) {
        this.model = sequelize.define(this.getModelName(), this.definition, {});
        return this;
    }
    configure() {
        //Hook Method
    }
    configureAssociations() {
        if (this.associations) {
            this.associations.forEach(assoc => {
                switch (assoc.type) {
                    case SequelizeModelConfig_1.AssociationType.HAS_MANY:
                        this.hasMany(assoc.modelName);
                        break;
                    case SequelizeModelConfig_1.AssociationType.BELONGS_TO:
                        this.belongsTo(assoc.modelName);
                        break;
                }
            });
        }
    }
    belongsTo(modelName) {
        this.model.belongsTo(this.sequelizeDB.getModel(modelName).getInstance());
    }
    hasMany(modelName) {
        this.model.hasMany(this.sequelizeDB.getModel(modelName).getInstance());
    }
    getInstance() {
        return this.model;
    }
    setSequelizeDB(sequelizeDB) {
        this.sequelizeDB = sequelizeDB;
    }
}
exports.BaseModel = BaseModel;
exports.DataTypes = Sequelize;
//# sourceMappingURL=BaseModel.js.map