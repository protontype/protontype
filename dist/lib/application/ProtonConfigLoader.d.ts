/// <reference types="cors" />
/// <reference types="sequelize" />
import { GlobalConfig } from './ProtonConfigLoader';
import * as winston from 'winston';
import * as sequelize from 'sequelize';
import * as cors from 'cors';
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
