import { JsonLoader } from 'jsontyped';
import * as sequelize from 'sequelize';

export var Config: GlobalConfig;
Config = JsonLoader.loadFile<GlobalConfig>(".", "proton.json");

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