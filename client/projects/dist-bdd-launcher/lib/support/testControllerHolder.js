"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestControllerHolder {
    capture(t) {
        this.testController = t;
        if (this.getResolver) {
            this.getResolver(t);
        }
        return new Promise((resolve) => {
            this.captureResolver = resolve;
        });
    }
    free() {
        this.testController = null;
        if (this.captureResolver) {
            this.captureResolver();
        }
    }
    get() {
        return new Promise((resolve) => {
            if (this.testController) {
                resolve(this.testController);
            }
            else {
                this.getResolver = resolve;
            }
        });
    }
}
exports.TestControllerHolder = TestControllerHolder;
const testControllerHolder = new TestControllerHolder();
exports.default = testControllerHolder;
