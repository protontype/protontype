import {SequelizeDB} from "../libs/SequelizeDB";
/**
 * Created by beto_ on 29/07/2016.
 */
export interface SequelizeModel {
    defineModel(sequelize: any, DataType: any): any;
    associate(sequelizeDB: SequelizeDB): void;
    getModelName(): string;
}
