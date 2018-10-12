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
const cucumber_1 = require("cucumber");
// TODO: remove after cucumber-js republishes initial AfterStep
function AfterStep(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.takeScreenshot();
    });
}
cucumber_1.When(/^Je me rends sur la page home$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.gotoPage('');
        yield AfterStep(this.page);
    });
});
cucumber_1.Then(/^Je devrais naviguer sur la page "(.*?)"$/, function (titleText) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.shouldTitleExists(titleText);
        yield AfterStep(this.page);
    });
});
cucumber_1.Then(/^Je devrais voir apparaître la modale "(.*?)"$/, function (modalTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.shouldModalTitleExists(modalTitle);
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je clique sur le bouton "(.*?)"/, function (buttonLabel) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.clickOnButton(buttonLabel);
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je clique sur le bouton primaire$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.clickOnPrimaryButton();
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je clique sur le bouton secondaire$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.clickOnSecondaryButton();
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je clique sur le bouton Icône "(.*?)"$/, function (buttonIconLabel) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.clickOnButtonIcon(buttonIconLabel);
        yield AfterStep(this.page);
    });
});
cucumber_1.Then(/Je devrais voir le champ de saisie "(.*?)"$/, function (inputLabel) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.shouldInputExists(inputLabel);
        yield AfterStep(this.page);
    });
});
cucumber_1.Then(/^Le bouton de validation principal devrait être (disabled|enabled)$/, function (isEnabled) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.shouldButtonPrimaryBeEnabledOrDisabled(isEnabled === 'enabled');
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je sélectionne le radio button "(.*?)"$/, function (radioLabel) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.clickOnRadioButton(radioLabel);
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je saisis la valeur "(.*?)" dans le champ de saisie "(.*?)"$/, function (value, inputLabel) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.writeInInput(inputLabel, value);
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je saisis la valeur "(.*?)" dans le champ de saisie n°(d+)$/, function (value, inputIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.writeInInput(inputIndex, value);
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je saisis le mail "(.*?)"$/, function (value) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.writeEmail(value);
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je saisis le numéro de téléphone "(d+)"$/, function (value) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.writePhone(value);
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je saisis la date de naissance "(.*?)"$/, function (value) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.writeBirthDate(value);
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^Je sélectionne la valeur "(.*?)" dans la liste "(.*?)"$/, function (value, selectLabel) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.selectListOption(selectLabel, value);
        yield AfterStep(this.page);
    });
});
cucumber_1.When(/^J'attends (\d+) secondes$/, function (numSeconds) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.waitDelay(numSeconds * 1000);
        yield AfterStep(this.page);
    });
});
cucumber_1.Then(/^Le champ de saisie n°(\d+) devrait contenir la valeur "(.*?)"$/, function (inputIndex, value) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.shouldInputHasValue(inputIndex, value);
        yield AfterStep(this.page);
    });
});
cucumber_1.Then(/^Je devrais voir le texte "(.*?)" sur la page$/, function (value) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.shouldPageHasText(value);
        yield AfterStep(this.page);
    });
});
cucumber_1.Then(/^Le champ de saisie "(.*?)" devrait contenir la valeur "(.*?)"$/, function (inputLabel, value) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.shouldInputHasValue(inputLabel, value);
        yield AfterStep(this.page);
    });
});
cucumber_1.Then(/^Je devrais voir cette erreur: "(.*?)"$/, function (errorText) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.shouldHaveError(errorText);
        yield AfterStep(this.page);
    });
});
cucumber_1.Then(/^Je devrais voir ce warning: "(.*?)"$/, function (warningText) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.shouldHaveWarning(warningText);
        yield AfterStep(this.page);
    });
});
