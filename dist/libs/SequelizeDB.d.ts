import { BaseModel } from '../models/BaseModel';
import * as Sequelize from 'sequelize';
/**
 * @author Humberto Machado
 */
export declare class SequelizeDB {
    private sequelize;
    private models;
    constructor();
    getInstance(): Sequelize.Sequelize;
    getModels(): any;
    getModel(modelName: string): BaseModel<any>;
    addModel(name: string, model: BaseModel<any>): void;
}
