"use strict";
const ProtonModelConfig_1 = require("../decorators/ProtonModelConfig");
const Sequelize = require("sequelize");
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
                    case ProtonModelConfig_1.AssociationType.HAS_MANY:
                        this.hasMany(assoc.modelName, assoc.options);
                        break;
                    case ProtonModelConfig_1.AssociationType.BELONGS_TO:
                        this.belongsTo(assoc.modelName, assoc.options);
                        break;
                    case ProtonModelConfig_1.AssociationType.HAS_ONE:
                        this.hasOne(assoc.modelName, assoc.options);
                        break;
                    case ProtonModelConfig_1.AssociationType.BELONGS_TO_MANY:
                        this.belongsToMany(assoc.modelName, assoc.options);
                        break;
                }
            });
        }
    }
    belongsTo(modelName, options) {
        this.model.belongsTo(this.ProtonDB.getModel(modelName).getInstance(), options);
    }
    hasMany(modelName, options) {
        this.model.hasMany(this.ProtonDB.getModel(modelName).getInstance(), options);
    }
    hasOne(modelName, options) {
        this.model.hasOne(this.ProtonDB.getModel(modelName).getInstance(), options);
    }
    belongsToMany(modelName, options) {
        this.model.belongsToMany(this.ProtonDB.getModel(modelName).getInstance(), options);
    }
    getInstance() {
        return this.model;
    }
    setProtonDB(ProtonDB) {
        this.ProtonDB = ProtonDB;
    }
}
exports.BaseModel = BaseModel;
exports.DataTypes = Sequelize;
//# sourceMappingURL=BaseModel.js.map