import {Config} from "./Config";
import * as Sequelize from "sequelize";
import {SequelizeModelLoader} from "./SequelizeModelLoader";

/**
 * @author Humberto Machado
 */
export class SequelizeDB {
    private sequelize: any = null;
    private models: any = {};

    constructor() {
        if (this.sequelize == null) {
            this.sequelize = new Sequelize(
                Config.database.name,
                Config.database.username,
                Config.database.password,
                Config.database.params
            );
            SequelizeModelLoader.loadModels(this);
        }
    }

    public getDB(): DB {
        return {
            sequelize: this.sequelize,
            Sequelize: Sequelize
        }
    }

    public getModels(): any {
        return this.models;
    }

    public getModel(modelName: string): any {
        return this.models[modelName];
    }

    public addModel(name: string, model: any): void {
        this.models[name] = model;
    }
}

export interface DB {
    sequelize: any;
    Sequelize: any;
}