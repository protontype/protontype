"use strict";
/**
 * @author Humberto Machado
 */
var SequelizeModelLoader = (function () {
    function SequelizeModelLoader() {
    }
    SequelizeModelLoader.loadModels = function (sequelizeDB) {
        this.modelsList.forEach(function (model) {
            sequelizeDB.addModel(model.getModelName(), model.defineModel(sequelizeDB.getInstance()));
            console.log("Model loaded: " + model.getModelName());
        });
        this.modelsList.forEach(function (model) {
            model.associate(sequelizeDB);
            model.configure(sequelizeDB);
        });
    };
    //Injected by @Model
    SequelizeModelLoader.modelsList = [];
    return SequelizeModelLoader;
}());
exports.SequelizeModelLoader = SequelizeModelLoader;
//Decorators
function Model(config) {
    return function (constructor) {
        constructor.prototype.name = config.name;
        constructor.prototype.definition = config.definition;
        SequelizeModelLoader.modelsList.push(constructor.prototype);
    };
}
exports.Model = Model;
//# sourceMappingURL=SequelizeModelLoader.js.map