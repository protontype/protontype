import { GOLBAL_CFG } from './Config';
import * as Sequelize from "sequelize"

export class SequelizeDB {
    private sequelize: any = null;

    constructor() {
        if (this.sequelize == null) {
            this.sequelize = new Sequelize(
                GOLBAL_CFG.database,
                GOLBAL_CFG.username,
                GOLBAL_CFG.password,
                GOLBAL_CFG.params
            )
        }
    }

    public getSequelize() {
        return this.sequelize;
    }

}

exports = Sequelize;