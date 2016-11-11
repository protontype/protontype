/// <reference types="sequelize" />
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
 *
 * Load a model
 */
export declare function LoadModel(config: BaseModel<any>): (constructor: Function) => void;
/**
 * Decorator
 */
export declare function HasMany(modelName: string, options?: Sequelize.AssociationOptionsHasMany): (constructor: Function) => void;
/**
 * Decorator
 */
export declare function BelongsTo(modelName: string, options?: Sequelize.AssociationOptionsBelongsTo): (constructor: Function) => void;
/**
 * Decorator
 */
export declare function HasOne(modelName: string, options?: Sequelize.AssociationOptionsHasOne): (constructor: Function) => void;
/**
 * Decorator
 */
export declare function BelongsToMany(modelName: string, options: Sequelize.AssociationOptionsBelongsToMany): (constructor: Function) => void;
export interface AssociationsConfig {
    type: AssociationType;
    modelName: string;
    options?: Sequelize.AssociationOptions;
}
export declare enum AssociationType {
    HAS_MANY = 0,
    BELONGS_TO = 1,
    HAS_ONE = 2,
    BELONGS_TO_MANY = 3,
}
export interface ModelConfig {
    name: string;
    definition: Sequelize.DefineAttributes;
}
