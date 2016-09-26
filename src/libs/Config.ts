import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";
import {JsonLoader} from "jsontyped/dist/JsonLoader";

export var Config: GolbalConfig;
Config = JsonLoader.loadFile<GolbalConfig>(".", "proton.json");

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