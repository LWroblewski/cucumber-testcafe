"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_config_model_1 = require("../support/test-config.model");
const report_config_model_1 = require("../report/report-config.model");
exports.defaultBddConfiguration = {
    tests: test_config_model_1.defaultTestConfiguration,
    reports: report_config_model_1.defaultReportingConfiguration
};
