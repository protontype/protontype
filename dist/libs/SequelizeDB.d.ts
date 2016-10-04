import * as Sequelize from "sequelize";
import { BaseModel } from "../models/BaseModel";
/**
 * @author Humberto Machado
 */
export declare class SequelizeDB {
    private sequelize;
    private models;
    constructor();
    getInstance(): Sequelize.Sequelize;
    getModels(): any;
    getModel(modelName: string): BaseModel;
    addModel(name: string, model: BaseModel): void;
}
