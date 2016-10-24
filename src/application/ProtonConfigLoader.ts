import * as winston from 'winston';
import { JsonLoader } from 'jsontyped';
import * as sequelize from 'sequelize';
import * as cors from 'cors';

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
    cors: cors.CorsOptions;
    logger: LoggerConfig;
    https: HTTPSConfig;
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
    key: string;
    cert: string;
}

export interface LoggerConfig extends winston.ConsoleTransportOptions, winston.FileTransportOptions {
    enabled: boolean;
}