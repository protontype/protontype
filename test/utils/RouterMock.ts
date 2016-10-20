import { ModelMock } from './ModelMock';
import { BaseCrudRouter, RouterClass, UseAuth } from '../../src';

@UseAuth()
@RouterClass({
    baseUrl: "/mocks",
    modelInstances: [new ModelMock()]
})
export class RouterMock extends BaseCrudRouter {

}