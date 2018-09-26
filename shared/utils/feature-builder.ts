import {USFileParser} from './us-parser';
import {Persona, PersonaData} from "../model/persona.model";
import {FeatureFile, KEYWORD_EXAMPLES, KEYWORD_FEATURE, KEYWORD_SCENARIO_OUTLINE} from '../model/feature-file.model';
import {US} from "../model/us-step.model";

export class FeatureBuilder {

  private _content = '';

  protected get featureFileName(): string {
    return this.persona.name.toLowerCase().replace(' ', '-');
  }

  constructor(private lstUS: USFileParser[], private persona: Persona) {}

  build(): FeatureFile {
    return {
      fileName: this.featureFileName,
      fileContent: this.buildContent()
    };
  }

  protected buildContent(): string {
    return this
      .title().newLines()
      .personaDescription().newLines()
      .featuresDescription().newLines()
      .scenarioTitle().newLines()
      .scenario().newLines()
      .examplesTitle().newLine()
      .examples().newLine()
      .toString();
  }

  private _addContent(value: string): this {
    this._content += value;
    return this;
  }

  private title(): this {
    return this._addContent(`${KEYWORD_FEATURE} ${this.persona.name}`);
  }

  private personaDescription(): this {
    return this
      .tab()
      ._addContent(this.persona.description);
  }

  private featuresDescription(): this {
    this.lstUS.forEach(us =>
      this
        .newLineTab()
        ._addContent(us.title)
        .newLineTab()
        ._addContent(us.description)
    );
    return this;
  }

  private scenarioTitle(): this {
    return this
      .tab()
      ._addContent(`${KEYWORD_SCENARIO_OUTLINE} ${this.persona.name}`);
  }

  private scenario(): this {
    return this._addContent(
      this.lstUS
        .filter(usFile => this.checkUSConditions(usFile.toUS()))
        .map(us => us.features)
        .join('')
    );
  }

  private examplesTitle(): this {
    return this._addContent(KEYWORD_EXAMPLES);
  }

  private examples(): this {
    return this
      ._addContent('| ')
      ._addContent(this.persona.data.map(personaData => personaData.key).join(' | '))
      ._addContent(' |\n| ')
      ._addContent(this.persona.data.map(personaData => personaData.value).join(' | '))
      ._addContent(' |');
  }

  private tab(): this {
    return this._addContent('\t');
  }

  private newLine(): this {
    return this._addContent('\n');
  }

  private newLineTab(): this {
    return this.newLine().tab();
  }

  private tabs(): this {
    return this.tab().tab();
  }

  private newLines(): this {
    return this.newLine().newLine();
  }

  private checkUSConditions(us: US): boolean {
    return !us.conditions || us.conditions.filter(condition => {
      const personaData: PersonaData = this.persona.data.find(data => data.key === condition.key);
      return !personaData || personaData.value !== condition.value;
    }).length === 0;
  }

  toString(): string {
    return this._content;
  }
}
