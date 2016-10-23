"use strict";
const winston = require('winston');
class Logger {
    static createLogger(config) {
        if (config) {
            let configuredTransports = [];
            if (config.filename) {
                configuredTransports.push(new winston.transports.File(config));
            }
            else {
                configuredTransports.push(new winston.transports.Console(config));
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