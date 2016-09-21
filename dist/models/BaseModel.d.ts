import { SequelizeModel } from "./SequelizeModel";
import { SequelizeDB } from "../libs/SequelizeDB";
import * as Sequelize from "sequelize";
/**
 * @author Humberto Machado
 */
export declare abstract class BaseModel implements SequelizeModel {
    protected model: Sequelize.Model<any, any>;
    protected name: string;
    protected definition: Sequelize.DefineAttributes;
    getModelName(): string;
    defineModel(sequelize: Sequelize.Sequelize): SequelizeModel;
    associate(sequelizeDB: SequelizeDB): void;
    getInstance(): Sequelize.Model<any, any>;
}
export declare var DataTypes: Sequelize.DataTypes;
