import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {PersonaData} from '../../../../../../../../../shared/model/persona.model';
import {BDDService} from '../../../services/bdd.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {StepVar} from '../../../../../../../../../shared/model/step-vars.model';
import {FormGroup} from '@angular/forms';
import {map} from 'rxjs/internal/operators';

@Component({
  templateUrl: './us-conditions.component.html',
  styleUrls: ['./us-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsConditionsComponent implements OnInit {

  usConditions: PersonaData[];
  stepVars$: Observable<StepVar[]>;

  formGroup: FormGroup;

  get filteredStepVars$(): Observable<StepVar[]> {
    return this.bddService.getStepVars()
      .pipe(
        map(stepVars => {
          const conditionKeys: string[] = this.usConditions.map(condition => condition.key);
          return stepVars.filter(stepVar => conditionKeys.indexOf(stepVar.key) === -1);
        })
      );
  }

  constructor(@Inject(MAT_DIALOG_DATA) usConditions: PersonaData[],
              private bddService: BDDService,
              private dialogRef: MatDialogRef<UsConditionsComponent>) {
    this.usConditions = usConditions ? [ ...usConditions ] : [];
  }

  ngOnInit() {
    this.stepVars$ = this.bddService.getStepVars();
    this.formGroup = new FormGroup({});
  }

  onStepVarSelected(event: { value: StepVar }) {
    this.usConditions = [
      ...this.usConditions,
      {
        key: event.value.key,
        value: null
      }
    ];
  }

  onPersonaDataChanged(personaData: PersonaData[]) {
    this.usConditions = [
      ...personaData
    ];
  }

  onStepVarsAdded() {
    this.dialogRef.close(this.usConditions);
  }
}
