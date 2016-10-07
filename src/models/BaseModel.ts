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

    public associate(sequelizeDB: SequelizeDB): void {
        //Hook Method
    }

    public configure(sequelizeDB: SequelizeDB) {
        //Hook Method
    }

    public getInstance(): Sequelize.Model<ModelAttributes, ModelAttributes> {
        return this.model;
    }
}

export var DataTypes: Sequelize.DataTypes = Sequelize;

export interface SequelizeBaseModelAttr extends Sequelize.Instance<SequelizeBaseModelAttr> {
    id: number
}