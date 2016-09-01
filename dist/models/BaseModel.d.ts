import { SequelizeModel } from "./SequelizeModel";
import { SequelizeDB } from "../libs/SequelizeDB";
import * as Sequelize from "sequelize";
/**
 * @author Humberto Machado
 */
export declare abstract class BaseModel implements SequelizeModel {
    protected nativeInstance: any;
    protected name: string;
    protected definition: {};
    getModelName(): string;
    defineModel(sequelize: any, DataTypes: any): any;
    associate(sequelizeDB: SequelizeDB): void;
    getNativeInstance(): any;
    find(params: Sequelize.FindOptions): any;
    create(object: Sequelize.CreateOptions): any;
    findOne(params: Sequelize.FindOptions): any;
    update(object: Object, params: Sequelize.UpdateOptions): any;
    destroy(params: Sequelize.DestroyOptions): any;
}
export declare var DataTypes: Sequelize.DataTypes;
