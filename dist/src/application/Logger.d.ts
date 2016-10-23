import { LoggerConfig } from '../';
import * as winston from 'winston';
export declare class Logger {
    static instance: winston.LoggerInstance;
    static createLogger(config: LoggerConfig): winston.LoggerInstance;
}
