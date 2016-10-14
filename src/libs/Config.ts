import { JsonLoader } from 'jsontyped';
import * as sequelize from 'sequelize';
import * as cors from 'cors';

export var Config: GlobalConfig;
Config = JsonLoader.loadFile<GlobalConfig>(".", "proton.json");

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