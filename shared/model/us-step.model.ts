import {STEPS} from './core-steps.model';
import {PersonaData} from './persona.model';

export const KEYWORD_PREDICATE = 'Given';
export const KEYWORD_ACTION = 'When';
export const KEYWORD_CONSEQUENCE = 'Then';
export const KEYWORD_CHAIN = 'And';

export enum STEP_CATEGORY {
  PREDICATE = 'Prédicat',
  ACTION = 'Action',
  CONSEQUENCE = 'Conséquence'
}

export interface StepCategory {
  category: STEP_CATEGORY;
  steps: Step[];
}

export interface Step {
  sentence: string;
  formattedSentence: string;
  variables?: string[];
  category: STEP_CATEGORY;
}

export interface US {
  title: string;
  link?: string;
  description?: string;
  order?: number;
  project?: string;
  category?: string;
  steps?: USStep[];
  conditions?: PersonaData[];
}

export interface USStep {
  stepKey: string;
  variables?: string[];
}

export interface USCategory {
  title: string;
  children: US[];
}

export const newUS = () => ({ title: null, steps: []});

export const STEP_VAR_CHAR = 'XX';

export function sentenceToUSStep(sentence: string): USStep {
  return {
    stepKey: getStepKeyFromSentence(sentence),
    variables: []
  };
}

export function usStepToString(usStep: USStep): string {
  let strStep: string = STEPS[usStep.stepKey];
  if (strStep && usStep.variables) {
    for (let index = 0; index < usStep.variables.length; index++) {
      strStep = strStep.replace(/\(([^)]+)\)/, usStep.variables[index]);
    }
  }
  return strStep;
}

export function getUsStepKeyword(usStep: USStep): string {
  const step: Step = getStepFromKey(usStep.stepKey);
  switch (step.category) {
    case STEP_CATEGORY.PREDICATE:
      return KEYWORD_PREDICATE;
    case STEP_CATEGORY.ACTION:
      return KEYWORD_ACTION;
    case STEP_CATEGORY.CONSEQUENCE:
      return KEYWORD_CONSEQUENCE;
    default:
      return null;
  }
}

/** Retourne la clé du step à partir de sa valeur **/
export function getStepKeyFromSentence(sentence: string): string {
  return Object.keys(STEPS).find(stepKey => STEPS[stepKey] === sentence);
}

export function getStepFromKey(stepKey: string): Step {
  return ALL_STEPS.find(step => step.sentence === STEPS[stepKey]);
}

export function formatStepSentence(sentence: string): string {
  return sentence.replace(/\(([^)]+)\)/, STEP_VAR_CHAR); // Removes vars regexs (.*?), etc
}

export function getStepVariables(sentence: string): string[] {
  return sentence.match(/\(([^)]+)\)/g);
}

/**
 * Construction d'un VO Step à partir d'une Regex et d'une catégorie données
 */
const buildStep = (category: STEP_CATEGORY, sentence: string) => {
  return {
    sentence,
    category,
    variables: getStepVariables(sentence),
    formattedSentence: formatStepSentence(sentence)
  };
};

export const ALL_STEPS: Step[] = [
  buildStep(STEP_CATEGORY.PREDICATE, STEPS.GIVEN_ON_PAGE),
  buildStep(STEP_CATEGORY.ACTION, STEPS.GOTO_HOME),
  buildStep(STEP_CATEGORY.ACTION, STEPS.GOTO_PAGE),
  buildStep(STEP_CATEGORY.ACTION, STEPS.BACK_BROWSER),
  buildStep(STEP_CATEGORY.ACTION, STEPS.CLICK_PRIMARY_BTN),
  buildStep(STEP_CATEGORY.ACTION, STEPS.CLICK_SECONDARY_BTN),
  buildStep(STEP_CATEGORY.ACTION, STEPS.CLICK_BTN),
  buildStep(STEP_CATEGORY.ACTION, STEPS.SELECT_LIST_OPTION),
  buildStep(STEP_CATEGORY.ACTION, STEPS.SELECT_RADIO_BUTTON),
  buildStep(STEP_CATEGORY.ACTION, STEPS.SET_INPUT_VALUE),
  buildStep(STEP_CATEGORY.ACTION, STEPS.SET_INPUT_VALUE_INDEX),
  buildStep(STEP_CATEGORY.ACTION, STEPS.SET_EMAIL),
  buildStep(STEP_CATEGORY.ACTION, STEPS.SET_PHONE),
  buildStep(STEP_CATEGORY.ACTION, STEPS.SET_BIRTH_DATE),
  buildStep(STEP_CATEGORY.ACTION, STEPS.WAIT),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_GO_TO_URL),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_GO_TO_PAGE),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_INPUT_HAS_VALUE),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_MAIN_BTN_ENABLED),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_SHOW_ERROR),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_SHOW_WARNING),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_SEE_BTNS),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_SEE_BTN),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_SEE_SELECT),
  buildStep(STEP_CATEGORY.CONSEQUENCE, STEPS.SHOULD_SEE_OPTION)
];

export const ALL_CATEGORIES: StepCategory[] = [
  ...Object.keys(STEP_CATEGORY)
    .filter(category => isNaN(Number(category)))
    .map(category => STEP_CATEGORY[category])
    .map(category  => ({
      category: category,
      steps: ALL_STEPS.filter(step => step.category === category)
    }))
];
