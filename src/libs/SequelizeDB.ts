import { BaseModel } from '../models/BaseModel';
import { Config } from './Config';
import { SequelizeModelConfig } from './SequelizeModelConfig';
import * as Sequelize from 'sequelize';

/**
 * @author Humberto Machado
 */
export class SequelizeDB {
    private sequelize: Sequelize.Sequelize = null;
    private models: any = {};

    constructor() {
        if (this.sequelize == null) {
            this.sequelize = new Sequelize(
                Config.database.name,
                Config.database.username,
                Config.database.password,
                Config.database.options
            );
            SequelizeModelConfig.loadModels(this);
        }
    }

    public getInstance(): Sequelize.Sequelize {
        return this.sequelize;
    }

    public getModels(): any {
        return this.models;
    }

    public getModel(modelName: string): BaseModel<any> {
        return this.models[modelName];
    }

    public addModel(name: string, model: BaseModel<any>): void {
        this.models[name] = model;
    }

}