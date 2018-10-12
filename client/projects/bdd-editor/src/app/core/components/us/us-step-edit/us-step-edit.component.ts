import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {getStepFromKey, getStepKeyFromSentence, Step, STEP_VAR_CHAR, USStep, usStepToString} from '../../../../../../../../../shared/model/us-step.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {formatStepVar, isStepVar, StepVar} from '../../../../../../../../../shared/model/step-vars.model';
import {Observable} from 'rxjs';
import {BDDService} from '../../../services/bdd.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './us-step-edit.component.html',
  styleUrls: ['./us-step-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsStepEditComponent implements OnInit {

  usStep: USStep;

  stepVars$: Observable<StepVar[]>;
  steps$: Observable<Step[]>;

  formGroup: FormGroup;
  varStates: boolean[];

  get formattedUSStep(): string {
    return usStepToString(this.usStep);
  }

  get step(): Step {
    return getStepFromKey(this.usStep.stepKey);
  }

  constructor(@Inject(MAT_DIALOG_DATA) usStep: USStep,
              private bddService: BDDService,
              private dialogRef: MatDialogRef<UsStepEditComponent>) {
    this.usStep = <USStep>{ ...usStep };
    this.usStep.variables = usStep.variables || [ ...this.step.variables ];
    this.varStates = this.usStep.variables ? this.usStep.variables.map(variable => !isStepVar(variable)) : [];
  }

  ngOnInit() {
    this.stepVars$ = this.bddService.getStepVars();
    this.steps$ = this.bddService.getSteps();
    this.formGroup = new FormGroup({
      step: new FormControl(this.step, Validators.required)
    });
  }

  onStepChange() {
    const newStep: Step = this.formGroup.get('step').value;
    this.usStep = {
      stepKey: getStepKeyFromSentence(newStep.sentence),
      variables: newStep.variables ? newStep.variables.map(() => STEP_VAR_CHAR) : []
    };
    this.varStates = newStep.variables ? newStep.variables.map(() => true) : [];
  }

  private changeVariableValue(varValue: string, indexVar: number) {
    this.usStep = <USStep>{
      ...this.usStep,
      variables: this.usStep.variables.map((variable, index) => index === indexVar ? varValue : variable)
    };
  }

  onStepVarChange(data: {value: string}, indexVar: number) {
    this.changeVariableValue(formatStepVar(data.value, true), indexVar);
  }

  isInputValue(indexVar: number): boolean {
    return this.varStates[indexVar];
  }

  onInputChange(event: {target: {value: string}}, indexVar: number) {
    this.changeVariableValue(event.target.value, indexVar);
  }

  onChangeValueType(event: {checked: boolean}, indexVar: number) {
    this.varStates[indexVar] = event.checked;
  }

  getInputPlaceholder(indexVar: number): string {
    return `Paramétrage de la valeur n°${indexVar + 1}`;
  }

  getInputValue(indexVar: number): string {
    return this.usStep.variables[indexVar];
  }

  getStepVarValue(indexVar: number): string {
    return formatStepVar(this.usStep.variables[indexVar], false);
  }

  save() {
    this.dialogRef.close(this.usStep);
  }
}
