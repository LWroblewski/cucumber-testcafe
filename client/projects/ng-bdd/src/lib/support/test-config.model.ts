export interface TestConfiguration {
  proxy: string;
  browsers: string[] | string;
  screenshotsPath: string;
  debug: boolean;
}

export const defaultTestConfiguration: TestConfiguration = {
  proxy: null,
  browsers: 'chrome',
  screenshotsPath: 'reports/screenshots/',
  debug: false
};
