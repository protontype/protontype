import * as winston from 'winston';
import * as sequelize from 'sequelize';
import * as cors from 'cors';
export declare class ProtonConfigLoader {
    static loadConfig(filePath?: string): GlobalConfig;
}
export interface GlobalConfig {
    port: number;
    database: DatabaseConfig;
    cors: cors.CorsOptions;
    logger: LoggerConfig;
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
export interface LoggerConfig extends winston.ConsoleTransportOptions, winston.FileTransportOptions {
    enabled: boolean;
}
