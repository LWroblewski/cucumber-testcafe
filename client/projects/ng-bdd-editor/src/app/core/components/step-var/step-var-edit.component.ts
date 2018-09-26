import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {StepVar} from '../../../../../../../../shared/model/step-vars.model';

export interface StepVarEditComponentConfig {
  stepVar: StepVar;
  selectedValue: string;
}

@Component({
  templateUrl: './step-var-edit.component.html',
  styleUrls: ['./step-var-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepVarEditComponent {

  selectedValue: string;

  constructor(public dialogRef: MatDialogRef<StepVarEditComponent>,
              @Inject(MAT_DIALOG_DATA) public config: StepVarEditComponentConfig) {
    this.selectedValue = this.config.selectedValue;
  }

  isStepVarList(): boolean {
    return this.config.stepVar.values !== null && this.config.stepVar.values.length > 0;
  }

  validate() {
    this.dialogRef.close(this.selectedValue);
  }

  hasNoSelectedValue() {
    return this.selectedValue === null || this.selectedValue === undefined;
  }
}
