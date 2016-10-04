import { SequelizeDB } from "./SequelizeDB";
import { BaseModel } from "../models/BaseModel";
import * as Sequelize from "sequelize";
/**
 * @author Humberto Machado
 */
export declare class SequelizeModelLoader {
    static modelsList: BaseModel[];
    static loadModels(sequelizeDB: SequelizeDB): void;
}
export declare function Model(config: ModelConfig): (constructor: Function) => void;
export interface ModelConfig {
    name: string;
    definition: Sequelize.DefineAttributes;
}
