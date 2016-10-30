import { SequelizeDB } from '../application/SequelizeDB';
import { AssociationsConfig, AssociationType } from '../application/SequelizeModelConfig';
import * as Sequelize from 'sequelize';

/**
 * @author Humberto Machado
 */
export abstract class BaseModel<ModelAttributes extends SequelizeBaseModelAttr> {
    //Sequelize Model native instance. @see http://docs.sequelizejs.com/en/latest/docs/models-usage/
    protected model: Sequelize.Model<ModelAttributes, ModelAttributes>;
    protected name: string;
    protected definition: Sequelize.DefineAttributes;
    protected sequelizeDB: SequelizeDB;
    protected associations: AssociationsConfig[];

    public getModelName(): string {
        return this.name;
    }

    public defineModel(sequelize: Sequelize.Sequelize): BaseModel<ModelAttributes> {
        this.model = sequelize.define<ModelAttributes, ModelAttributes>(this.getModelName(), this.definition, {});
        return this;
    }

    public configure() {
        //Hook Method
    }

    public configureAssociations() {
        if (this.associations) {
            this.associations.forEach(assoc => {
                switch (assoc.type) {
                    case AssociationType.HAS_MANY:
                        this.hasMany(assoc.modelName);
                        break;
                    case AssociationType.BELONGS_TO:
                        this.belongsTo(assoc.modelName);
                        break;
                }
            })

        }
    }

    public belongsTo(modelName: string) {
        this.model.belongsTo(this.sequelizeDB.getModel(modelName).getInstance());
    }

    public hasMany(modelName: string) {
        this.model.hasMany(this.sequelizeDB.getModel(modelName).getInstance());
    }

    public getInstance(): Sequelize.Model<ModelAttributes, ModelAttributes> {
        return this.model;
    }

    public setSequelizeDB(sequelizeDB: SequelizeDB) {
        this.sequelizeDB = sequelizeDB;
    }
}

export var DataTypes: Sequelize.DataTypes = Sequelize;

export interface SequelizeBaseModelAttr extends Sequelize.Instance<SequelizeBaseModelAttr> {
    id: number,
    created_at: Date,
    updated_at: Date
}