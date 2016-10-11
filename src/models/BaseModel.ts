import { SequelizeDB } from '../libs/SequelizeDB';
import * as Sequelize from 'sequelize';

/**
 * @author Humberto Machado
 */
export abstract class BaseModel<ModelAttributes extends SequelizeBaseModelAttr> {
    //Sequelize Model native instance. @see http://docs.sequelizejs.com/en/latest/docs/models-usage/
    protected model: Sequelize.Model<ModelAttributes, ModelAttributes>;
    protected name: string;
    protected definition: Sequelize.DefineAttributes;

    public getModelName(): string {
        return this.name;
    }

    public defineModel(sequelize: Sequelize.Sequelize): BaseModel<ModelAttributes> {
        this.model = sequelize.define<ModelAttributes, ModelAttributes>(this.getModelName(), this.definition, {});
        return this;
    }

    public configure(sequelizeDB: SequelizeDB) {
        //Hook Method
    }

    public belongsTo(sequelizeDB: SequelizeDB, modelName: string) {
        this.model.belongsTo(sequelizeDB.getModel(modelName).getInstance());
    }

    public hasMany(sequelizeDB: SequelizeDB, modelName: string) {
        this.model.hasMany(sequelizeDB.getModel(modelName).getInstance());
    }

    public getInstance(): Sequelize.Model<ModelAttributes, ModelAttributes> {
        return this.model;
    }
}

export var DataTypes: Sequelize.DataTypes = Sequelize;

export interface SequelizeBaseModelAttr extends Sequelize.Instance<SequelizeBaseModelAttr> {
    id: number,
    created_at: Date,
    updated_at: Date
}