import { World } from 'cucumber';
import { TestConfiguration } from './test-config.model';
export declare class TestCafeWorld implements World {
    readonly attach: (...args) => void;
    private readonly parameters;
    private holder;
    private testController;
    private page;
    private waitForTestController;
    private _config;
    readonly config: TestConfiguration;
    constructor({attach, parameters}: {
        attach: any;
        parameters: any;
    });
}
