
export const GOLBAL_CFG: GolbalConfig = {
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        define: {
            underscored: true
        }
    }
}

interface GolbalConfig {
    database: string;
    username: string;
    password: string;
    params: DBParams;
}

interface DBParams {
    dialect: string;
    storage: string;
    define: DBDefine;
}

interface DBDefine {
    underscored: boolean;
}