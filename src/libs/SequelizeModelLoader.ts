import {SequelizeDB} from "./SequelizeDB";
import {SequelizeModel} from "../models/SequelizeModel";

/**
 * @author Humberto Machado
 */
export class SequelizeModelLoader {
    //Injected by @Model
    public static modelsList: any[] = [];

    public static loadModels(sequelizeDB: SequelizeDB): void {
        this.modelsList.forEach((model: SequelizeModel) => {
            sequelizeDB.addModel(model.getModelName(), 
                model.defineModel(sequelizeDB.getDB().sequelize, sequelizeDB.getDB().Sequelize));

            console.log(`Model loaded: ${model.getModelName()}`)
        });

        this.modelsList.forEach((model: SequelizeModel) => {
            model.associate(sequelizeDB);
        });
    }
}

//Decorators
export function Model(config: ModelConfig){
    return function (constructor: Function) {
        constructor.prototype.name = config.name;
        constructor.prototype.definition = config.definition;
        SequelizeModelLoader.modelsList.push(constructor.prototype);
    }
}

export interface ModelConfig {
    name: string;
    definition: {}
}
