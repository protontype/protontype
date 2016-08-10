/**
 * Express routes configurations
 */
export abstract class ExpressRouter {
    constructor() {
        console.log(`>>>> Configurado rotas para ${this.getBaseUrl()} <<<<`);
    }

    abstract getBaseUrl(): string;

    public sendErrorMessage(res: any, error: any): void {
        res.status(412).json({msg: error.message})
    }
}

export function Router(config?: RouterConfig) {
    return function (constructor: Function) {
        constructor.prototype.baseUrl = config.baseUrl;
    }
}

export interface RouterConfig {
    baseUrl: string;
}