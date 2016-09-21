"use strict";
var fs = require("fs");
var path = require("path");
var filePath = path.join(".", "proton.json");
if (fs.existsSync(filePath)) {
    exports.Config = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }).toString());
}
else {
    console.log("Configuration file proton.json not found ");
}
//# sourceMappingURL=Config.js.map