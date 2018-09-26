import {FeatureFile, KEYWORD_EXAMPLES, KEYWORD_FEATURE, KEYWORD_SCENARIO} from '../model/feature-file.model';
import {getUsStepKeyword, KEYWORD_CHAIN, sentenceToUSStep, US, USStep, usStepToString} from '../model/us-step.model';
import {PersonaData} from '../model/persona.model';

export class USFileParser {

  private _previousKeyword: string;

  private _lines: string[];

  private _title: string;
  private _description: string;
  private _scenarioTitle: string;
  private _featureLines: string[];
  private _steps: USStep[];
  private _conditions: PersonaData[];

  static fromUS(us: US): USFileParser {
    return new USFileParser(null, us);
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get scenarioTitle(): string {
    return this._scenarioTitle;
  }

  get features(): string {
    return this._featureLines.join('\n');
  }

  get content(): string {
    return this.file.fileContent;
  }

  get steps(): USStep[] {
    return this._steps;
  }

  private get indexLineScenarioDef(): number {
    return this._lines.findIndex(line => line.startsWith(KEYWORD_SCENARIO));
  }

  private get indexLineExamplesDef(): number {
    return this._lines.findIndex(line => line.startsWith(KEYWORD_EXAMPLES));
  }

  constructor(private file: FeatureFile = null, us: US = null) {
    if (this.file) {
      this.parseFile();
    } else if (us) {
      this.parseUS(us);
    }
  }

  private parseUS(us: US) {
    this._title = us.title;
    this._description = us.description;
    this._steps = us.steps;
    this._conditions = us.conditions;
    this._previousKeyword = null;
    this._featureLines = this._steps.map(usStep => this.usStepToString(usStep));
  }

  private usStepToString(usStep: USStep): string {
    let keyword = getUsStepKeyword(usStep);
    if (keyword === this._previousKeyword) {
      keyword = KEYWORD_CHAIN;
    }
    this._previousKeyword = keyword;
    return `${keyword} ${usStepToString(usStep)}\n`;
  }

  private parseFile() {
    this._lines = this.file.fileContent.split('\n').map(line => line.trim());
    if (this._lines.length > 0) {
      this._title = this._lines[0].replace(KEYWORD_FEATURE, '').trim();
      const scenarioDefLine: number = this.indexLineScenarioDef;
      this._description = this._lines.slice(1, scenarioDefLine).join('');
      this._scenarioTitle = this._lines[scenarioDefLine];
      this.buidFeatures();
    }
  }

  private buidFeatures() {
    const scenarioDefLine: number = this.indexLineScenarioDef;
    const examplesDefLine: number = this.indexLineExamplesDef;
    this._featureLines = examplesDefLine > -1 ?
      this._lines.slice(scenarioDefLine + 1, examplesDefLine) : this._lines.slice(scenarioDefLine + 1);
    this.parseFeatureSteps();
  }

  private parseFeatureSteps() {
    this._steps = this._featureLines
      .filter(line => line !== '' && !line.startsWith('|'))
      .map(featureLine => sentenceToUSStep(
        featureLine.substr(featureLine.indexOf(' ') + 1) // On retire le mot clé (Given, When, Then, And, etc)
      ));
  }

  toUS(): US {
    return {
      title: this._title,
      description: this.description,
      steps: this._steps,
      conditions: this._conditions
    };
  }
}
