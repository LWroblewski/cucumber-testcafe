import { TestConfiguration } from '../support/test-config.model';
import { ReportingConfiguration } from '../report/report-config.model';
export interface BddConfiguration {
    tests: TestConfiguration;
    reports: ReportingConfiguration;
}
export declare const defaultBddConfiguration: BddConfiguration;
