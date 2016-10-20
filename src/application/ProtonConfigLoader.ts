import { JsonLoader } from 'jsontyped';
import * as sequelize from 'sequelize';
import * as cors from 'cors';

export class ProtonConfigLoader {
    public static loadConfig(filePath?: string): GlobalConfig {
        if (!filePath)
            filePath = './proton.json';
        return JsonLoader.loadFile<GlobalConfig>(filePath);
    }
}

export interface GlobalConfig {
    port: number;
    database: DatabaseConfig;
    cors: cors.CorsOptions;
}

export interface DatabaseConfig {
    name: string;
    username: string;
    password: string;
    options: sequelize.Options;
}

export interface DBDefine {
    underscored: boolean;
}