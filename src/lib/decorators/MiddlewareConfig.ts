import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';

export function Middleware() {
    return function (target: ProtonMiddleware, propertyKey: string, descriptor: PropertyDescriptor) {
        target.middlewareFuntion = descriptor.value;
    };
}