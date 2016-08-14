import { ExpressApplication } from './../libs/ExpressApplication';
/**
 * @author Humberto Machado
 * Express routes configurations
 */
export abstract class ExpressRouter {
    protected express: any;
    protected expressApplication: ExpressApplication;

    constructor() {
        console.log(`>>>> Configured routes to ${this.getBaseUrl()} <<<<`);
    }

    public init(expressApplication: ExpressApplication) {
        this.express = expressApplication.getExpress();
        this.expressApplication = expressApplication;
    }

    abstract getBaseUrl(): string;

    public sendErrorMessage(res: any, error: any): void {
        res.status(412).json({ msg: error.message })
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

export interface RouteFunctionParams {
    request: any,
    response: any,
    model: any
}