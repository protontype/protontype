"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsontyped_1 = require("jsontyped");
class ProtonConfigLoader {
    static loadConfig(filePath) {
        if (!filePath)
            filePath = './proton.json';
        return jsontyped_1.JsonLoader.loadFile(filePath);
    }
}
exports.ProtonConfigLoader = ProtonConfigLoader;
exports.DEFAULT_CONFIG = {
    "port": 3000,
    "database": {
        "name": "proton-example",
        "username": "",
        "password": "",
        "options": {
            "dialect": "sqlite",
            "storage": "proton.sqlite",
            "define": {
                "underscored": true
            }
        }
    }
};
//# sourceMappingURL=ProtonConfigLoader.js.map