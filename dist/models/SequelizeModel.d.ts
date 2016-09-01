import { SequelizeDB } from "../libs/SequelizeDB";
/**
 * @author Humberto Machado
 */
export interface SequelizeModel {
    defineModel(sequelize: any, DataType: any): any;
    associate(sequelizeDB: SequelizeDB): void;
    getModelName(): string;
    find(params: Object): Promise<any>;
    create(object: Object): Promise<any>;
    findOne(params: Object): Promise<any>;
    update(object: Object, params: Object): Promise<any>;
    destroy(params: Object): Promise<any>;
    getNativeInstance(): any;
}
