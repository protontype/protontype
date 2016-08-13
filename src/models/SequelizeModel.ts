import {SequelizeDB} from "../libs/SequelizeDB";
/**
 * @author Humberto Machado
 */
export interface SequelizeModel {
    defineModel(sequelize: any, DataType: any): any;
    associate(sequelizeDB: SequelizeDB): void;
    getModelName(): string;
}
