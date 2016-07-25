import { SequelizeDB } from './../libs/SequelizeDB';
export class Tasks {
    private instance: any; 

    constructor(sequelizeDB: SequelizeDB){
        let sequelize = sequelizeDB.getSequelize();
    }

    public findAll(params: Object, callback: Function){
        return callback([
            { title: "Fazer compras" },
            { title: "Consertar PC" },
        ]);
    }
}