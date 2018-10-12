"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_model_1 = require("./config.model");
const fs = require("fs");
const CONFIG_FILE_NAME = 'bdd-config.json';
function loadConfig() {
    return new Promise((resolve, reject) => {
        fs.readFile(CONFIG_FILE_NAME, (err, data) => {
            resolve(err ? config_model_1.defaultBddConfiguration : Object.assign({}, config_model_1.defaultBddConfiguration, JSON.parse(data.toString())));
        });
    });
}
exports.loadConfig = loadConfig;
