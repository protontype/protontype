import * as console from 'console';
import { LoggerConfig } from '../';
import * as winston from 'winston';

export class Logger {
    public static instance: winston.LoggerInstance = new winston.Logger({
        transports: [
            new winston.transports.Console({ level: "info" })
        ]
    });

    public static createLogger(config: LoggerConfig): winston.LoggerInstance {
        if (config) {
            let configuredTransports: winston.TransportInstance[] = [];

            if (config.filename) {
                configuredTransports.push(new winston.transports.File(config));
            } else {
                configuredTransports.push(new winston.transports.Console(config));
            }

            if (config.enabled) {
                Logger.instance = new winston.Logger({
                    transports: configuredTransports
                });
            } else {
                Logger.instance = new winston.Logger({});
            }
        }
        return Logger.instance;
    }
}