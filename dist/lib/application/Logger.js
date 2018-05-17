"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
class Logger {
    static createLogger(config) {
        if (config) {
            let configuredTransports = [];
            if (config.transports) {
                config.transports.forEach(transport => {
                    switch (transport.type.toLowerCase()) {
                        case "file":
                            configuredTransports.push(new winston_1.default.transports.File(transport.options));
                            break;
                        case "dailyfile":
                            configuredTransports.push(new winston_1.default.transports.DailyRotateFile(transport.options));
                            break;
                        case "console":
                        default:
                            configuredTransports.push(new winston_1.default.transports.Console(transport.options));
                            break;
                    }
                });
            }
            if (config.enabled) {
                Logger.instance = new winston_1.default.Logger({
                    transports: configuredTransports
                });
            }
            else {
                Logger.instance = new winston_1.default.Logger({});
            }
        }
        return Logger.instance;
    }
}
/**
 * Logger instance.
 * @see {@link https://github.com/winstonjs/winston#instantiating-your-own-logger}
 */
Logger.instance = new winston_1.default.Logger({
    transports: [
        new winston_1.default.transports.Console({ level: "info" })
    ]
});
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map