import * as Sequelize from "sequelize";
import { SequelizeModel } from "../models/SequelizeModel";
/**
 * @author Humberto Machado
 */
export declare class SequelizeDB {
    private sequelize;
    private models;
    constructor();
    getInstance(): Sequelize.Sequelize;
    getModels(): any;
    getModel(modelName: string): SequelizeModel;
    addModel(name: string, model: SequelizeModel): void;
}
