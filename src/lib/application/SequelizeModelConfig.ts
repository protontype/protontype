import { BaseModel } from '../models/BaseModel';
import * as Sequelize from 'sequelize';

/**
 * @author Humberto Machado
 */
export class SequelizeModelConfig {
    //Injected by @Model
    public static modelsList: BaseModel<any>[];

    public static add(model: BaseModel<any>) {
        if (!this.modelsList) {
            this.modelsList = [];
        }
        this.modelsList.push(model);
    }
}

/**
 * Decorator
 * 
 * Define a Sequelize Model
 */
export function Model(config: ModelConfig) {
    return function (constructor: Function) {
        constructor.prototype.name = config.name;
        constructor.prototype.definition = config.definition;
        SequelizeModelConfig.add(constructor.prototype);
    }
}

/**
 * Decorator
 * 
 * Load a model
 */
export function LoadModel(config: BaseModel<any>) {
    return function (constructor: Function) {
       
    }
}

/**
 * Decorator
 */
export function HasMany(modelName: string, options?: Sequelize.AssociationOptionsHasMany) {
    return function (constructor: Function) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        constructor.prototype.associations.push({ type: AssociationType.HAS_MANY, modelName: modelName, options: options });

    }
}

/**
 * Decorator
 */
export function BelongsTo(modelName: string, options?: Sequelize.AssociationOptionsBelongsTo) {
    return function (constructor: Function) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        constructor.prototype.associations.push({ type: AssociationType.BELONGS_TO, modelName: modelName, options: options });
    }
}

/**
 * Decorator
 */
export function HasOne(modelName: string, options?: Sequelize.AssociationOptionsHasOne) {
    return function (constructor: Function) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        constructor.prototype.associations.push({ type: AssociationType.HAS_ONE, modelName: modelName, options: options });
    }
}

/**
 * Decorator
 */
export function BelongsToMany(modelName: string, options: Sequelize.AssociationOptionsBelongsToMany) {
    return function (constructor: Function) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        constructor.prototype.associations.push({ type: AssociationType.BELONGS_TO_MANY, modelName: modelName, options: options });
    }
}

export interface AssociationsConfig {
    type: AssociationType,
    modelName: string;
    options?: Sequelize.AssociationOptions;
}

export enum AssociationType {
    HAS_MANY, BELONGS_TO, HAS_ONE, BELONGS_TO_MANY
}

export interface ModelConfig {
    name: string;
    definition: Sequelize.DefineAttributes
}
