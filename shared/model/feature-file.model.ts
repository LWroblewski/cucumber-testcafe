export const KEYWORD_FEATURE = 'Feature:';
export const KEYWORD_SCENARIO = 'Scenario';
export const KEYWORD_SCENARIO_OUTLINE = 'Scenario Outline:';
export const KEYWORD_EXAMPLES = 'Examples:';

export interface FeatureFile {
  fileName: string;
  fileContent: string;
}
