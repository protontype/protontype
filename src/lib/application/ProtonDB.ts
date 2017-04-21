import { BaseModel } from '../models/BaseModel';
import { Logger } from './Logger';
import { DatabaseConfig } from './ProtonConfigLoader';
import * as Sequelize from 'sequelize';
import { Dictionary } from 'typescript-collections';
import * as winston from 'winston';

/**
 * @author Humberto Machado
 */
export class ProtonDB {
    private sequelize: Sequelize.Sequelize = null;
    private models: Dictionary<string, BaseModel<any>> = new Dictionary<string, BaseModel<any>>();
    private logger: winston.LoggerInstance = Logger.instance;

    constructor(config: DatabaseConfig) {
        if (this.sequelize == null && config) {
            this.sequelize = new Sequelize(config.name, config.username,
                config.password, config.options
            );
        }
    }

    public loadModels(modelsList: BaseModel<any>[]): this {
        if (modelsList && this.sequelize) {
            modelsList.forEach((model: BaseModel<any>) => {
                if (!this.getModel(model.getModelName())) {
                    this.addModel(model.getModelName(), model.defineModel(this.sequelize));
                    model.setProtonDB(this);
                    this.logger.info(`Model loaded: ${model.getModelName()}`);
                }
            });

            modelsList.forEach((model: BaseModel<any>) => {
                model.configureAssociations();
                model.configure();
            });
        }

        return this;
    }

    public async start(): Promise<any> {
        if (this.sequelize) {
            return this.sequelize.sync();
        }
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