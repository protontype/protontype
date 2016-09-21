import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";

let filePath: string = path.join(".", "proton.json");

export var Config: GolbalConfig;
if (fs.existsSync(filePath)) {
    Config = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}).toString());
} else {
    console.log("Configuration file proton.json not found ");
}

export interface GolbalConfig {
    port: number;
    database: DatabaseConfig;
}

export interface DatabaseConfig {
    name: string;
    username: string;
    password: string;
    options: Sequelize.Options;
}

export interface DBDefine {
    underscored: boolean;
}