"use strict";
/**
 * @author Humberto Machado
 */
class SequelizeModelConfig {
    static add(model) {
        if (!this.modelsList) {
            this.modelsList = [];
        }
        this.modelsList.push(model);
    }
}
exports.SequelizeModelConfig = SequelizeModelConfig;
/**
 * Decorator
 *
 * Define a Sequelize Model
 */
function Model(config) {
    return function (constructor) {
        constructor.prototype.name = config.name;
        constructor.prototype.definition = config.definition;
        SequelizeModelConfig.add(constructor.prototype);
    };
}
exports.Model = Model;
/**
 * Decorator
 */
function HasMany(...modelNames) {
    return function (constructor) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        modelNames.forEach(modelName => {
            constructor.prototype.associations.push({ type: AssociationType.HAS_MANY, modelName: modelName });
        });
    };
}
exports.HasMany = HasMany;
/**
 * Decorator
 */
function BelongsTo(...modelNames) {
    return function (constructor) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        modelNames.forEach(modelName => {
            constructor.prototype.associations.push({ type: AssociationType.BELONGS_TO, modelName: modelName });
        });
    };
}
exports.BelongsTo = BelongsTo;
(function (AssociationType) {
    AssociationType[AssociationType["HAS_MANY"] = 0] = "HAS_MANY";
    AssociationType[AssociationType["BELONGS_TO"] = 1] = "BELONGS_TO";
})(exports.AssociationType || (exports.AssociationType = {}));
var AssociationType = exports.AssociationType;
//# sourceMappingURL=SequelizeModelConfig.js.map