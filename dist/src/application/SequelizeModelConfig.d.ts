import { BaseModel } from '../models/BaseModel';
import * as Sequelize from 'sequelize';
/**
 * @author Humberto Machado
 */
export declare class SequelizeModelConfig {
    static modelsList: BaseModel<any>[];
    static add(model: BaseModel<any>): void;
}
/**
 * Decorator
 *
 * Define a Sequelize Model
 */
export declare function Model(config: ModelConfig): (constructor: Function) => void;
/**
 * Decorator
 */
export declare function HasMany(...modelNames: string[]): (constructor: Function) => void;
/**
 * Decorator
 */
export declare function BelongsTo(...modelNames: string[]): (constructor: Function) => void;
export interface AssociationsConfig {
    type: AssociationType;
    modelName: string;
}
export declare enum AssociationType {
    HAS_MANY = 0,
    BELONGS_TO = 1,
}
export interface ModelConfig {
    name: string;
    definition: Sequelize.DefineAttributes;
}
