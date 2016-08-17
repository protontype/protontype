export declare var Config: GolbalConfig;
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
