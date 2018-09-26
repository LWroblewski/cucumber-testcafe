import {After, AfterAll, Before, BeforeAll, setDefaultTimeout} from 'cucumber';
import {TestConfiguration} from './test-config.model';
import {loadConfig} from '../config/config-loader';

const createTestCafe = require('testcafe');

let config: TestConfiguration = null;
let testcafe = null;
let indexPort = 0;

setDefaultTimeout(60000);

BeforeAll(() => loadConfig().then(({tests}) => config = tests));

Before(function() {
  console.log('createTestCafe on ' + (1338 + indexPort) + ' and ' + (1339 + indexPort));
  createTestCafe('localhost', 1338 + indexPort, 1339 + indexPort)
    .then(tc => {
      console.log('createTestCafe done');
      testcafe = tc;
      const runner = testcafe.createRunner();
      return runner
        .useProxy(config.proxy)
        .src(`node_modules/ng-bdd/lib/test.js`)
        .screenshots(config.screenshotsPath, false)
        // .concurrency(2)
        .browsers(config.browsers)
        .run({ debugMode: config.debug })
        .then(() => {
          testcafe.close();
          // runner.stop();
        })
        .catch(() => {
          console.log('closing testcafe on error...');
          // testcafe.close();
        });
    });
  indexPort += 2;
  return this.waitForTestController
    .then(testController => testController.maximizeWindow());
});

After(function() {
  this.holder.free();
});

AfterAll(() => {
  let intervalId = null;

  function waitForTestCafe() {
    intervalId = setInterval(checkLastResponse, 1000);
  }

  function checkLastResponse() {
    process.exit();
    clearInterval(intervalId);
  }

  waitForTestCafe();
});
