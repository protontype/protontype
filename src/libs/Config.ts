import * as fs from "fs";
import * as path from "path";

let filePath: string = path.join(".", "taconfig.json");

export var Config: GolbalConfig;
if (fs.existsSync(filePath)) {
    Config = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}).toString());
} else {
    console.log("Não foi encontrado o arquivo taconfig.json");
}

export interface GolbalConfig {
    port: number;
    database: DatabaseConfig;
}

export interface DatabaseConfig {
    name: string;
    username: string;
    password: string;
    params: DBParams;
}

export interface DBParams {
    dialect: string;
    storage: string;
    define: DBDefine;
}

export interface DBDefine {
    underscored: boolean;
}