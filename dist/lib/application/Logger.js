"use strict";
const winston = require("winston");
class Logger {
    static createLogger(config) {
        if (config) {
            let configuredTransports = [];
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
            }
            else {
                Logger.instance = new winston.Logger({});
            }
        }
        return Logger.instance;
    }
}
Logger.instance = new winston.Logger({
    transports: [
        new winston.transports.Console({ level: "info" })
    ]
});
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map