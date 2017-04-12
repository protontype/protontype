"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Humberto Machado
 */
class ProtonModelConfig {
    static add(model) {
        if (!this.modelsList) {
            this.modelsList = [];
        }
        this.modelsList.push(model);
    }
}
exports.ProtonModelConfig = ProtonModelConfig;
/**
 * Decorator
 *
 * Define a Sequelize Model
 */
function Model(config) {
    return function (constructor) {
        constructor.prototype.name = config.name;
        constructor.prototype.definition = config.definition;
        ProtonModelConfig.add(constructor.prototype);
    };
}
exports.Model = Model;
/**
 * Decorator
 *
 * Load a model
 */
function LoadModel(config) {
    return function (constructor) {
    };
}
exports.LoadModel = LoadModel;
/**
 * Decorator
 */
function HasMany(modelName, options) {
    return function (constructor) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        constructor.prototype.associations.push({ type: AssociationType.HAS_MANY, modelName: modelName, options: options });
    };
}
exports.HasMany = HasMany;
/**
 * Decorator
 */
function BelongsTo(modelName, options) {
    return function (constructor) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        constructor.prototype.associations.push({ type: AssociationType.BELONGS_TO, modelName: modelName, options: options });
    };
}
exports.BelongsTo = BelongsTo;
/**
 * Decorator
 */
function HasOne(modelName, options) {
    return function (constructor) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        constructor.prototype.associations.push({ type: AssociationType.HAS_ONE, modelName: modelName, options: options });
    };
}
exports.HasOne = HasOne;
/**
 * Decorator
 */
function BelongsToMany(modelName, options) {
    return function (constructor) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        constructor.prototype.associations.push({ type: AssociationType.BELONGS_TO_MANY, modelName: modelName, options: options });
    };
}
exports.BelongsToMany = BelongsToMany;
var AssociationType;
(function (AssociationType) {
    AssociationType[AssociationType["HAS_MANY"] = 0] = "HAS_MANY";
    AssociationType[AssociationType["BELONGS_TO"] = 1] = "BELONGS_TO";
    AssociationType[AssociationType["HAS_ONE"] = 2] = "HAS_ONE";
    AssociationType[AssociationType["BELONGS_TO_MANY"] = 3] = "BELONGS_TO_MANY";
})(AssociationType = exports.AssociationType || (exports.AssociationType = {}));
//# sourceMappingURL=ProtonModelConfig.js.map