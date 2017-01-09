import * as cors from 'cors';
import { JsonLoader } from 'jsontyped';
import * as sequelize from 'sequelize';
import * as winston from 'winston';

export class ProtonConfigLoader {
    public static loadConfig(filePath?: string): GlobalConfig {
        if (!filePath)
            filePath = './proton.json';
        return JsonLoader.loadFile<GlobalConfig>(filePath);
    }
}

export interface GlobalConfig {
    port: number;
    database: DatabaseConfig;
    cors?: cors.CorsOptions;
    logger?: LoggerConfig;
    https?: HTTPSConfig;
    defaultRoutes?: boolean;
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

export interface HTTPSConfig {
    enabled: boolean;
    key: string;
    cert: string;
}

export interface LoggerConfig {
    enabled: boolean;
    transports: { type: string, options: winston.TransportOptions }[]
}


export const DEFAULT_CONFIG: GlobalConfig = {
    "port": 3000,
    "database": {
        "name": "proton-example",
        "username": "",
        "password": "",
        "options": {
            "dialect": "sqlite",
            "storage": "proton.sqlite",
            "define": {
                "underscored": true
            }
        }
    }
}