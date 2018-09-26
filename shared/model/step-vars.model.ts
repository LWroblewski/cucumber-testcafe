import {Persona, PersonaData} from "./persona.model";

const stepVarRegex: RegExp = /<(.*)>/;

export interface StepVar {
  key: string;
  label: string;
  description?: string;
  project?: string;
  order?: number;
  values?: string[];
}

export const newStepVar: StepVar = { key: null, label: null, values: [] };

export function isStepVar(strVar: string): boolean {
  return stepVarRegex.test(strVar);
}

export function formatStepVarKey(stepVarLabel: string): string {
  return stepVarLabel ? stepVarLabel.toLowerCase().replace(new RegExp(' ', 'g'), '-') : null;
}

export function formatStepVar(text: string, formatAsStepVar: boolean): string {
  if (formatAsStepVar) {
    return !isStepVar(text) ? `<${text}>` : text;
  } else {
    return isStepVar(text) ? text.replace(/[<>]/g, '') : text;
  }
}

export function getPersonaStepVarValue(variable: string, persona: Persona): string {
  if (isStepVar(variable)) {
    const stepVar: string = formatStepVar(variable, false);
    const personaData: PersonaData = persona.data.find(data => data.key === stepVar);
    return personaData ? personaData.value : variable;
  }
  return variable;
}
