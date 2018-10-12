"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testcafe_1 = require("testcafe");
const base64Img = require("base64-img");
const DELAY = 3000;
class PageObject {
    constructor(t, world) {
        this.t = t;
        this.world = world;
        this.getLocation = testcafe_1.ClientFunction(() => document.location.href);
        this.goBack = testcafe_1.ClientFunction(() => window.history.back());
    }
    /**------------------- Element selectors -----------------**/
    getContent() {
        return this.getElement('body');
    }
    buttons() {
        return this.getElement('button');
    }
    buttonPrimary() {
        return this.getElement("button.primary" /* BUTTON_PRIMARY */);
    }
    buttonSecondary() {
        return this.getElement("button.outline" /* BUTTON_SECONDARY */);
    }
    buttonWithLabel(label) {
        return this.buttons().withText(label);
    }
    iconButtons() {
        return this.getElement("button mat-icon" /* BUTTON_ICON */);
    }
    iconButtonWithLabel(label) {
        return this.iconButtons().withAttribute('aria-label', new RegExp(label));
    }
    radioButtons() {
        return this.getElement("mat-radio-button" /* RADIO_BUTTON */);
    }
    radioButton(label) {
        return this.radioButtons().withText(label);
    }
    selects() {
        return this.getElement("mat-select" /* SELECT */);
    }
    select(label) {
        return this.selects().withAttribute('ng-reflect-placeholder', new RegExp(label));
    }
    selectOption(optionLabel) {
        return this.getElement('mat-option').withText(optionLabel);
    }
    inputs() {
        return this.getElement('input.mat-input-element');
    }
    input(inputId) {
        return __awaiter(this, void 0, void 0, function* () {
            return isNaN(Number(inputId)) ? this.inputWithLabel(inputId) : this.inputWithIndex(Number(inputId));
        });
    }
    inputWithLabel(inputLabel) {
        return this.inputs().withAttribute('ng-reflect-placeholder', new RegExp(inputLabel, 'g'));
    }
    inputWithIndex(index) {
        return this.inputs().child(index);
    }
    email() {
        return this.inputs().withAttribute('type', 'email');
    }
    phone() {
        return this.inputs().withAttribute('type', 'tel');
    }
    birthDate() {
        return this.inputs().withAttribute('name', 'birthDate');
    }
    title() {
        return this.getElement("h1.title" /* TITLE */);
    }
    errors() {
        return this.getElement("mat-error" /* ERROR */);
    }
    error(errorText) {
        return this.errors().withText(errorText);
    }
    warnings() {
        return this.getElement("mat-hint.mat-warning" /* WARNING */);
    }
    warning(warningText) {
        return this.warnings().withText(warningText);
    }
    /**-------------------- Browser interactions -------------------------**/
    gotoPage(page) {
        return this.t.navigateTo('/' + page);
    }
    expectUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield this.getLocation();
            return this.t.expect(location).contains(url);
        });
    }
    /**-------------------- DOM Elements actions ----------------------------**/
    writeInInput(inputId, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield this.input(inputId);
            yield this.t.typeText(input, value);
        });
    }
    writeEmail(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield this.email();
            yield this.t.typeText(input, value);
        });
    }
    writePhone(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield this.phone();
            yield this.t.typeText(input, value);
        });
    }
    writeBirthDate(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield this.birthDate();
            yield this.t.typeText(input, value);
        });
    }
    selectListOption(selectLabel, optionLabel) {
        return __awaiter(this, void 0, void 0, function* () {
            const select = yield this.select(selectLabel);
            yield this.t.click(select);
            yield this.t.click(this.selectOption(optionLabel));
        });
    }
    clickOnButton(buttonLabel) {
        return __awaiter(this, void 0, void 0, function* () {
            const button = this.buttonWithLabel(buttonLabel);
            yield this.t.click(button);
        });
    }
    clickOnPrimaryButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.t.click(this.buttonPrimary());
        });
    }
    clickOnSecondaryButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.t.click(yield this.buttonSecondary());
        });
    }
    clickOnButtonIcon(buttonLabel) {
        return __awaiter(this, void 0, void 0, function* () {
            const buttonIcon = yield this.iconButtonWithLabel(buttonLabel);
            yield this.t.click(buttonIcon);
        });
    }
    clickOnRadioButton(radioLabel) {
        return __awaiter(this, void 0, void 0, function* () {
            const radioButton = this.radioButton(radioLabel);
            yield this.t.click(radioButton);
        });
    }
    /**-------------------- DOM Elements expectations ------------------------**/
    shouldPageHasText(text) {
        return this.shouldElementWithContentExists('body', text);
    }
    shouldTitleExists(title) {
        return this.shouldElementWithContentExists("h1.title" /* TITLE */, title);
    }
    shouldModalTitleExists(modalTitle) {
        return this.shouldElementWithContentExists("mat-dialog-container h1.title" /* MODAL_TITLE */, modalTitle);
    }
    shouldInputExists(inputLabel) {
        return this.inputWithLabel(inputLabel).exists;
    }
    shouldHaveAGivenNumberOfButtons(numButtons) {
        return this.shouldHaveAGivenNumberOfElements('button.mat-button', numButtons);
    }
    shouldButtonPrimaryBeEnabledOrDisabled(enabled) {
        return this.shouldElementBeEnabledOrDisabled("button.primary" /* BUTTON_PRIMARY */, enabled);
    }
    shouldInputHasValue(inputId, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.t.wait(DELAY);
            const inputValue = yield this.inputWithLabel(inputId).value;
            return this.t.expect(inputValue).eql(value);
        });
    }
    shouldHaveError(errorText) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorElt = yield this.error(errorText);
            return this.t.expect(errorElt.exists).ok();
        });
    }
    shouldHaveWarning(warningText) {
        return __awaiter(this, void 0, void 0, function* () {
            const warningElt = yield this.warning(warningText);
            return this.t.expect(warningElt.exists).ok();
        });
    }
    /**---------------------- Core functions ----------------------------------**/
    shouldElementBeEnabledOrDisabled(element, enabled) {
        if (enabled) {
            return this.getElement(element);
        }
        else {
            return this.getElement(element).withAttribute('disabled');
        }
    }
    shouldElementWithContentExists(element, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const elem = yield this.getElement(element).textContent;
            return this.t.expect(elem).contains(content);
        });
    }
    shouldHaveAGivenNumberOfElements(element, numElements) {
        const elem = this.getElement(element);
        return this.t.expect(elem.count).eql(numElements);
    }
    getElement(selector) {
        return testcafe_1.Selector(selector).with({ boundTestRun: this.t });
    }
    waitDelay(delay) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.t.wait(delay);
        });
    }
    takeScreenshot(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.t.takeScreenshot(path).then(screenPath => {
                const imgInBase64 = base64Img.base64Sync(screenPath);
                const imageConvertForCuc = imgInBase64.substring(imgInBase64.indexOf(',') + 1);
                return this.world.attach(imageConvertForCuc, 'image/png');
            });
        });
    }
}
exports.PageObject = PageObject;
