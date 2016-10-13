import { BaseModel } from '../models/BaseModel';
import { SequelizeDB } from './SequelizeDB';
import * as Sequelize from 'sequelize';
/**
 * @author Humberto Machado
 */
export declare class SequelizeModelLoader {
    static modelsList: BaseModel<any>[];
    static loadModels(sequelizeDB: SequelizeDB): void;
}
/**
 * Decorator
 *
 * Define a Sequelize Model
 */
export declare function Model(config: ModelConfig): (constructor: Function) => void;
export interface ModelConfig {
    name: string;
    definition: Sequelize.DefineAttributes;
}
