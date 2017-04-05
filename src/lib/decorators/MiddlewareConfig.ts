import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';

export function Middleware(config?: { modelName: string; }) {
    return function (target: ProtonMiddleware, propertyKey: string, descriptor: PropertyDescriptor) {
        target.middlewareFuntion = descriptor.value;
        if (config) {
            target.modelName = config.modelName;
        }
    };
}