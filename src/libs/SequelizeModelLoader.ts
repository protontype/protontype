import {SequelizeDB} from "./SequelizeDB";
import {SequelizeModel} from "../models/SequelizeModel";
/**
 * Created by beto_ on 29/07/2016.
 */
    
export class SequelizeModelLoader {
    //Injected by @Model
    public static modelsList: any[] = [];

    public static loadModels(sequelizeDB: SequelizeDB): void {
        this.modelsList.forEach((model: SequelizeModel) => {
            sequelizeDB.addModel(model.getModelName(), 
                model.defineModel(sequelizeDB.getDB().sequelize, sequelizeDB.getDB().Sequelize));

            console.log(`Carregado model ${model.getModelName()}`)
        });

        this.modelsList.forEach((model: SequelizeModel) => {
            model.associate(sequelizeDB);
        });
    }
}

export function Model(model: SequelizeModel) {
    return function (constructor: Function) {
        SequelizeModelLoader.modelsList.push(model);
    }
}
