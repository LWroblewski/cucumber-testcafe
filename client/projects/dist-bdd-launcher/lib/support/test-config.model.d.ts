export interface TestConfiguration {
    host: string;
    proxy: string;
    browsers: string[] | string;
    concurrency: number;
    screenshotsPath: string;
    debug: boolean;
    testFile: string;
}
export declare const defaultTestConfiguration: TestConfiguration;
