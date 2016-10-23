"use strict";
const jsontyped_1 = require('jsontyped');
class ProtonConfigLoader {
    static loadConfig(filePath) {
        if (!filePath)
            filePath = './proton.json';
        return jsontyped_1.JsonLoader.loadFile(filePath);
    }
}
exports.ProtonConfigLoader = ProtonConfigLoader;
//# sourceMappingURL=ProtonConfigLoader.js.map