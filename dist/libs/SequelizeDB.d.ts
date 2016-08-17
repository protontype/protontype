/**
 * @author Humberto Machado
 */
export declare class SequelizeDB {
    private sequelize;
    private models;
    constructor();
    getDB(): DB;
    getModels(): any;
    getModel(modelName: string): any;
    addModel(name: string, model: any): void;
}
export interface DB {
    sequelize: any;
    Sequelize: any;
}
