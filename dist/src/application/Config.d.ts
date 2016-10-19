import * as sequelize from 'sequelize';
import * as cors from 'cors';
export declare var Config: GlobalConfig;
export interface GlobalConfig {
    port: number;
    database: DatabaseConfig;
    cors: cors.CorsOptions;
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
