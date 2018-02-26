"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsontyped_1 = require("jsontyped");
class ProtonConfigLoader {
    /**
     * Load confg file
     *
     * @param filePath Optional configuration file path. Default value is './proton.json'
     */
    static loadConfig(filePath) {
        if (!filePath)
            filePath = './proton.json';
        return jsontyped_1.JsonLoader.loadFile(filePath);
    }
}
exports.ProtonConfigLoader = ProtonConfigLoader;
exports.DEFAULT_CONFIG = {
    "servers": [
        {
            port: 3000,
            useHttps: false
        }
    ],
    "database": {
        "name": "protontypeConnection",
        "type": "sqlite",
        "database": "proton.db",
        "synchronize": true,
        "logging": false,
        "entities": [
            "dist/model/**/*.js"
        ],
        "migrations": [
            "dist/migration/**/*.ts"
        ],
        "subscribers": [
            "dist/subscriber/**/*.ts"
        ],
        "cli": {
            "entitiesDir": "dist/model",
            "migrationsDir": "dist/migration",
            "subscribersDir": "dist/subscriber"
        }
    }
};
//# sourceMappingURL=ProtonConfigLoader.js.map