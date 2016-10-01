import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";
import {JsonLoader} from "jsontyped";

export var Config: GlobalConfig;
Config = JsonLoader.loadFile<GlobalConfig>(".", "proton.json");

export interface GlobalConfig {
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