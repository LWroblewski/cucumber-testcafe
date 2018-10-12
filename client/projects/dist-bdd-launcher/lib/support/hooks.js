"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const config_loader_1 = require("../config/config-loader");
const createTestCafe = require('testcafe');
let config = null;
let testcafe = null;
let indexPort = 0;
cucumber_1.setDefaultTimeout(60000);
cucumber_1.BeforeAll(() => config_loader_1.loadConfig().then(({ tests }) => config = tests));
cucumber_1.Before(function () {
    createTestCafe(config.host, 1338 + indexPort, 1339 + indexPort)
        .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();
        return runner
            .useProxy(config.proxy)
            .src(config.testFile)
            .screenshots(config.screenshotsPath, false)
            .concurrency(config.concurrency)
            .browsers(config.browsers)
            .run({ debugMode: config.debug })
            .then(() => {
            testcafe.close();
            // runner.stop();
        })
            .catch(error => {
            console.log('closing testcafe on error...', error);
            // testcafe.close();
        });
    });
    indexPort += 2;
    return this.waitForTestController
        .then(testController => testController.maximizeWindow());
});
cucumber_1.After(function () {
    this.holder.free();
});
cucumber_1.AfterAll(() => {
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
