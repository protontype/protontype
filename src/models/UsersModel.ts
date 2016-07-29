import { SequelizeDB } from './../libs/SequelizeDB';
import * as Sequelize from 'sequelize';

export class UsersModel {
    private User: any;
    public static MODEL_NAME = "Users";

    constructor(sequelizeDB: SequelizeDB) {
        let sequelize = sequelizeDB.getSequelize();
        this.User = sequelize.define(UsersModel.MODEL_NAME, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        }, {
                classMethods: {
                    associate: (models) => {
                        this.User.hasMany(models.Tasks);
                    }
                }
            });
    }

    public getUser(): any {
        return this.User;
    }
}