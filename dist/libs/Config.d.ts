import * as sequelize from 'sequelize';
export declare var Config: GlobalConfig;
export interface GlobalConfig {
    port: number;
    database: DatabaseConfig;
}
export interface DatabaseConfig {
    name: string;
    username: string;
    password: string;
    options: sequelize.Options;
}
export interface DBDefine {
    underscored: boolean;
}
