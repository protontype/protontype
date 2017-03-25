/// <reference types="sequelize" />
import { BaseModel } from '../models/BaseModel';
import { DatabaseConfig } from './ProtonConfigLoader';
import * as Sequelize from 'sequelize';
import { Dictionary } from 'typescript-collections';
/**
 * @author Humberto Machado
 */
export declare class ProtonDB {
    private sequelize;
    private models;
    private logger;
    constructor(config: DatabaseConfig);
    loadModels(modelsList: BaseModel<any>[]): this;
    start(): Promise<any>;
    getInstance(): Sequelize.Sequelize;
    getModels(): Dictionary<string, BaseModel<any>>;
    getModel(modelName: string): BaseModel<any>;
    addModel(name: string, model: BaseModel<any>): void;
}
