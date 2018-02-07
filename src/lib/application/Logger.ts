import { LoggerConfig } from '../';
import winston from 'winston';

export class Logger {
    /**
     * Logger instance.
     * @see {@link https://github.com/winstonjs/winston#instantiating-your-own-logger}
     */
    public static instance: winston.LoggerInstance = new winston.Logger({
        transports: [
            new winston.transports.Console({ level: "info" })
        ]
    });

    public static createLogger(config: LoggerConfig): winston.LoggerInstance {
        if (config) {
            let configuredTransports: winston.TransportInstance[] = [];

            if (config.transports) {
                config.transports.forEach(transport => {
                    switch (transport.type.toLowerCase()) {
                        case "file":
                            configuredTransports.push(new winston.transports.File(transport.options));
                            break;
                        case "dailyfile":
                            configuredTransports.push(new winston.transports.DailyRotateFile(transport.options));
                            break;
                        case "console":
                        default:
                            configuredTransports.push(new winston.transports.Console(transport.options));
                            break;
                    }
                });
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