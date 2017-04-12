/// <reference types="cors" />
/// <reference types="sequelize" />
import * as cors from 'cors';
import * as sequelize from 'sequelize';
import * as winston from 'winston';
export declare class ProtonConfigLoader {
    static loadConfig(filePath?: string): GlobalConfig;
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
    transports: {
        type: string;
        options: winston.TransportOptions;
    }[];
}
export declare const DEFAULT_CONFIG: GlobalConfig;
