import {GOLBAL_CFG} from "./Config";
import * as Sequelize from "sequelize";
import {SequelizeModelLoader} from "./SequelizeModelLoader";

export class SequelizeDB {
    private sequelize :any = null;
    private models: any = {};

    constructor() {
        if (this.sequelize == null) {
            this.sequelize = new Sequelize(
                GOLBAL_CFG.database,
                GOLBAL_CFG.username,
                GOLBAL_CFG.password,
                GOLBAL_CFG.params
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

interface DB {
    sequelize: any;
    Sequelize: any;
}