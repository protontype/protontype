"use strict";
/**
 * @author Humberto Machado
 */
var SequelizeModelConfig = (function () {
    function SequelizeModelConfig() {
    }
    SequelizeModelConfig.add = function (model) {
        if (!this.modelsList) {
            this.modelsList = [];
        }
        this.modelsList.push(model);
    };
    return SequelizeModelConfig;
}());
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
function HasMany() {
    var modelNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        modelNames[_i - 0] = arguments[_i];
    }
    return function (constructor) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        modelNames.forEach(function (modelName) {
            constructor.prototype.associations.push({ type: AssociationType.HAS_MANY, modelName: modelName });
        });
    };
}
exports.HasMany = HasMany;
/**
 * Decorator
 */
function BelongsTo() {
    var modelNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        modelNames[_i - 0] = arguments[_i];
    }
    return function (constructor) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        modelNames.forEach(function (modelName) {
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