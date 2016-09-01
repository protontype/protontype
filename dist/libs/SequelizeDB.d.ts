import { SequelizeModel } from "../models/SequelizeModel";
/**
 * @author Humberto Machado
 */
export declare class SequelizeDB {
    private sequelize;
    private models;
    constructor();
    getDB(): DB;
    getModels(): any;
    getModel(modelName: string): SequelizeModel;
    addModel(name: string, model: SequelizeModel): void;
}
export interface DB {
    sequelize: any;
    Sequelize: any;
}
