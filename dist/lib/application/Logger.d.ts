import { LoggerConfig } from '../';
import * as winston from 'winston';
export declare class Logger {
    /**
     * Logger instance.
     * @see {@link https://github.com/winstonjs/winston#instantiating-your-own-logger}
     */
    static instance: winston.LoggerInstance;
    static createLogger(config: LoggerConfig): winston.LoggerInstance;
}
