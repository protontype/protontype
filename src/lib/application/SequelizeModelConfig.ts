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
 */
export function HasMany(...modelNames: string[]) {
    return function (constructor: Function) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        modelNames.forEach(modelName => {
            constructor.prototype.associations.push({ type: AssociationType.HAS_MANY, modelName: modelName });
        })

    }
}

/**
 * Decorator
 */
export function BelongsTo(...modelNames: string[]) {
    return function (constructor: Function) {
        if (!constructor.prototype.associations) {
            constructor.prototype.associations = [];
        }
        modelNames.forEach(modelName => {
            constructor.prototype.associations.push({ type: AssociationType.BELONGS_TO, modelName: modelName });
        });
    }
}

export interface AssociationsConfig {
    type: AssociationType,
    modelName: string;
}

export enum AssociationType {
    HAS_MANY, BELONGS_TO
}

export interface ModelConfig {
    name: string;
    definition: Sequelize.DefineAttributes
}
