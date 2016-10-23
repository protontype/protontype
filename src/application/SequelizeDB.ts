import * as winston from 'winston';
import { Logger } from './Logger';
import { BaseModel } from '../models/BaseModel';
import { DatabaseConfig } from './ProtonConfigLoader';
import * as Sequelize from 'sequelize';
import { Dictionary } from 'typescript-collections';

/**
 * @author Humberto Machado
 */
export class SequelizeDB {
    private sequelize: Sequelize.Sequelize = null;
    private models: Dictionary<string, BaseModel<any>> = new Dictionary<string, BaseModel<any>>();
    private logger: winston.LoggerInstance = Logger.instance;

    constructor(config: DatabaseConfig) {
        if (this.sequelize == null) {
            this.sequelize = new Sequelize(config.name, config.username,
                config.password, config.options
            );
        }
    }

    public loadModels(modelsList: BaseModel<any>[]): this {
        modelsList.forEach((model: BaseModel<any>) => {
            if (!this.getModel(model.getModelName())) {
                this.addModel(model.getModelName(), model.defineModel(this.sequelize));
                model.setSequelizeDB(this);
                this.logger.info(`Model loaded: ${model.getModelName()}`);
            }
        });

        modelsList.forEach((model: BaseModel<any>) => {
            model.configureAssociations();
            model.configure();
        });

        return this;
    }

    public getInstance(): Sequelize.Sequelize {
        return this.sequelize;
    }

    public getModels(): Dictionary<string, BaseModel<any>> {
        return this.models;
    }

    public getModel(modelName: string): BaseModel<any> {
        return this.models.getValue(modelName);
    }

    public addModel(name: string, model: BaseModel<any>): void {
        this.models.setValue(name, model);
    }

}