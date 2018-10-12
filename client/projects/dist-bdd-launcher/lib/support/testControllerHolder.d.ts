export declare class TestControllerHolder {
    captureResolver: any;
    getResolver: (value?: (TestController | PromiseLike<TestController>)) => void;
    testController: TestController;
    capture(t: any): Promise<TestController>;
    free(): void;
    get(): Promise<TestController>;
}
declare const testControllerHolder: TestControllerHolder;
export default testControllerHolder;
