import { SequelizeModel } from "./SequelizeModel";
import { SequelizeDB } from "../libs/SequelizeDB";
/**
 * @author Humberto Machado
 */
export declare abstract class BaseModel implements SequelizeModel {
    protected model: any;
    protected name: string;
    protected definition: {};
    getModelName(): string;
    defineModel(sequelize: any, DataTypes: any): any;
    associate(sequelizeDB: SequelizeDB): void;
}
