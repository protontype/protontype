import { BaseModel } from '../models/BaseModel';
import { DatabaseConfig } from './Config';
import * as Sequelize from 'sequelize';
import { Dictionary } from 'typescript-collections';
/**
 * @author Humberto Machado
 */
export declare class SequelizeDB {
    private sequelize;
    private models;
    constructor(config: DatabaseConfig);
    loadModels(modelsList: BaseModel<any>[]): this;
    getInstance(): Sequelize.Sequelize;
    getModels(): Dictionary<string, BaseModel<any>>;
    getModel(modelName: string): BaseModel<any>;
    addModel(name: string, model: BaseModel<any>): void;
}
