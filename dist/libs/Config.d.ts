import * as Sequelize from "sequelize";
export declare var Config: GlobalConfig;
export interface GlobalConfig {
    port: number;
    database: DatabaseConfig;
}
export interface DatabaseConfig {
    name: string;
    username: string;
    password: string;
    options: Sequelize.Options;
}
export interface DBDefine {
    underscored: boolean;
}
