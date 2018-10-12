import { TestCafeWorld } from '../support/world';
export declare const enum ElementSelector {
    TITLE = "h1.title",
    MODAL_TITLE = "mat-dialog-container h1.title",
    SELECT = "mat-select",
    BUTTON_PRIMARY = "button.primary",
    BUTTON_SECONDARY = "button.outline",
    BUTTON_ICON = "button mat-icon",
    RADIO_BUTTON = "mat-radio-button",
    ERROR = "mat-error",
    WARNING = "mat-hint.mat-warning",
}
export declare class PageObject {
    private t;
    private world;
    getLocation: ClientFunction;
    goBack: ClientFunction;
    constructor(t: TestController, world: TestCafeWorld);
    /**------------------- Element selectors -----------------**/
    getContent(): Selector;
    buttons(): Selector;
    buttonPrimary(): Selector;
    buttonSecondary(): Selector;
    buttonWithLabel(label: string): Selector;
    iconButtons(): Selector;
    iconButtonWithLabel(label: string): SelectorPromise;
    radioButtons(): Selector;
    radioButton(label: string): Selector;
    selects(): Selector;
    select(label: string): SelectorPromise;
    selectOption(optionLabel: string): Selector;
    inputs(): Selector;
    input(inputId: string | number): Promise<NodeSnapshot | Selector>;
    inputWithLabel(inputLabel: string): SelectorPromise;
    inputWithIndex(index: number): Selector;
    email(): SelectorPromise;
    phone(): SelectorPromise;
    birthDate(): SelectorPromise;
    title(): Selector;
    errors(): Selector;
    error(errorText: string): Selector;
    warnings(): Selector;
    warning(warningText: string): Selector;
    /**-------------------- Browser interactions -------------------------**/
    gotoPage(page: string): Promise<any>;
    expectUrl(url: string): Promise<any>;
    /**-------------------- DOM Elements actions ----------------------------**/
    writeInInput(inputId: string | number, value: string): Promise<void>;
    writeEmail(value: string): Promise<void>;
    writePhone(value: string): Promise<void>;
    writeBirthDate(value: string): Promise<void>;
    selectListOption(selectLabel: string, optionLabel: string): Promise<void>;
    clickOnButton(buttonLabel: string): Promise<void>;
    clickOnPrimaryButton(): Promise<void>;
    clickOnSecondaryButton(): Promise<void>;
    clickOnButtonIcon(buttonLabel: string): Promise<void>;
    clickOnRadioButton(radioLabel: string): Promise<void>;
    /**-------------------- DOM Elements expectations ------------------------**/
    shouldPageHasText(text: string): Promise<any>;
    shouldTitleExists(title: string): Promise<any>;
    shouldModalTitleExists(modalTitle: string): Promise<any>;
    shouldInputExists(inputLabel: string): Promise<boolean>;
    shouldHaveAGivenNumberOfButtons(numButtons: number): TestControllerPromise;
    shouldButtonPrimaryBeEnabledOrDisabled(enabled: boolean): Selector | SelectorPromise;
    shouldInputHasValue(inputId: string, value: string): Promise<any>;
    shouldHaveError(errorText: string): Promise<any>;
    shouldHaveWarning(warningText: string): Promise<any>;
    /**---------------------- Core functions ----------------------------------**/
    shouldElementBeEnabledOrDisabled(element: string, enabled: boolean): Selector | SelectorPromise;
    shouldElementWithContentExists(element: string, content: string): Promise<any>;
    shouldHaveAGivenNumberOfElements(element: string, numElements: number): TestControllerPromise;
    getElement(selector: string): Selector;
    waitDelay(delay: number): Promise<void>;
    takeScreenshot(path?: string): Promise<void>;
}
