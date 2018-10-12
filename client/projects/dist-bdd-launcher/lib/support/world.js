"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const testControllerHolder_1 = require("./testControllerHolder");
const page_object_1 = require("../page-objects/page-object");
class TestCafeWorld {
    get config() {
        return this._config;
    }
    constructor({ attach, parameters }) {
        this.attach = attach;
        this.parameters = parameters;
        this.holder = testControllerHolder_1.default;
        this.waitForTestController = this.holder.get()
            .then(tc => {
            this.testController = tc;
            this.page = new page_object_1.PageObject(this.testController, this);
            return tc;
        });
    }
}
exports.TestCafeWorld = TestCafeWorld;
cucumber_1.setWorldConstructor(TestCafeWorld);
