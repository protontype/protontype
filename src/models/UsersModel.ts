import {SequelizeDB} from "../libs/SequelizeDB";
import {TasksModel} from "./TasksModel";
import {Model} from '../libs/SequelizeModelLoader';
import * as DataType from "sequelize"
import {BaseModel} from "./BaseModel";

@Model({
    name: 'Users',
    definition: {
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
    }
})
export class UsersModel extends BaseModel {
    public associate(sequelizeDB:SequelizeDB):void {
        this.model.hasMany(sequelizeDB.getModel(new TasksModel()));
        console.log('Associado models a USER');
    }
}