import { SequelizeDB } from '../libs/SequelizeDB';
import * as Sequelize from 'sequelize';
/**
 * @author Humberto Machado
 */
export declare abstract class BaseModel<ModelAttributes extends SequelizeBaseModelAttr> {
    protected model: Sequelize.Model<ModelAttributes, ModelAttributes>;
    protected name: string;
    protected definition: Sequelize.DefineAttributes;
    protected sequelizeDB: SequelizeDB;
    getModelName(): string;
    defineModel(sequelize: Sequelize.Sequelize): BaseModel<ModelAttributes>;
    configure(): void;
    belongsTo(modelName: string): void;
    hasMany(modelName: string): void;
    getInstance(): Sequelize.Model<ModelAttributes, ModelAttributes>;
    setSequelizeDB(sequelizeDB: SequelizeDB): void;
}
export declare var DataTypes: Sequelize.DataTypes;
export interface SequelizeBaseModelAttr extends Sequelize.Instance<SequelizeBaseModelAttr> {
    id: number;
    created_at: Date;
    updated_at: Date;
}
