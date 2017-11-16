import * as cors from 'cors';
import { JsonLoader } from 'jsontyped';
import * as winston from 'winston';
import { ConnectionOptions } from 'typeorm';

export class ProtonConfigLoader {
    /**
     * Load confg file
     * 
     * @param filePath Optional configuration file path. Default value is './proton.json'
     */
    public static loadConfig(filePath?: string): GlobalConfig {
        if (!filePath)
            filePath = './proton.json';
        return JsonLoader.loadFile<GlobalConfig>(filePath);
    }
}

export interface GlobalConfig {
    port: number;
    database: ConnectionOptions;
    cors?: cors.CorsOptions;
    logger?: LoggerConfig;
    https?: HTTPSConfig;
    defaultRoutes?: boolean;
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
        "name": "protontypeConnection",
        "type": "sqlite",
        "database": "proton.db",
        "synchronize": true,
        "logging": false,
        "entities": [
            "dist/model/**/*.js"
        ],
        "migrations": [
            "dist/migration/**/*.ts"
        ],
        "subscribers": [
            "dist/subscriber/**/*.ts"
        ],
        "cli": {
            "entitiesDir": "dist/model",
            "migrationsDir": "dist/migration",
            "subscribersDir": "dist/subscriber"
        }
    }
}