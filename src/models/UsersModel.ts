import {SequelizeModel} from "./SequelizeModel";
import {SequelizeDB} from "../libs/SequelizeDB";
import {TasksModel} from "./TasksModel";
import {Model} from '../libs/SequelizeModelLoader';

@Model(new UsersModel())
export class UsersModel implements SequelizeModel {
    public static MODEL_NAME = "Users";
    private User:any;

    public defineModel(sequelize:any, DataType:any):any {
        this.User = sequelize.define(UsersModel.MODEL_NAME, {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: DataType.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        }, {});

        return this.User;
    }

    associate(sequelizeDB:SequelizeDB):void {
        this.User.hasMany(sequelizeDB.getModel(new TasksModel()));
        console.log('Associado models a USER');
    }

    public getModelName():string {
        return UsersModel.MODEL_NAME;
    }
}