import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BDDService} from '../../core/services/bdd.service';
import {ModalService} from '../../core/components/modal/modal.service';
import {formatStepVarKey, newStepVar, StepVar} from '../../../../../../../shared/model/step-vars.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {of, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/internal/operators';

@Component({
  templateUrl: './page-step-var.component.html',
  styleUrls: ['./page-step-var.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageStepVarComponent implements OnInit, OnDestroy {

  newStepVarValue: string = null;

  private _stepVar: StepVar;

  set stepVar(value: StepVar) {
    this._stepVar = value;
    this.values = [ ...this._stepVar.values ] || [];
    if (this._stepVar) {
      this.formGroup.patchValue(this._stepVar);
    }
  }

  values: string[];
  formGroup: FormGroup;
  subscription$: Subscription;

  constructor(private route: ActivatedRoute,
              private bddService: BDDService,
              private modal: ModalService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      key: new FormControl({value: '', disabled: true}),
      label: new FormControl('', Validators.required),
      description: new FormControl()
    });
    this.subscription$ = this.formGroup.get('label').valueChanges
      .subscribe(newLabel => this.formGroup.get('key').patchValue(formatStepVarKey(newLabel)));

    this.route.paramMap
      .pipe(
        map((params: ParamMap) => [params.get('projectKey'), params.get('stepVarId')]),
        switchMap(([project, stepVarId]) => stepVarId ? this.bddService.getStepVar(stepVarId) : of({ ...newStepVar, project }))
      )
      .subscribe(stepVar => this.stepVar = stepVar);
  }

  deleteStepVarValue(stepVarValue: string) {
    this.values = this.values.filter(value => value !== stepVarValue);
  }

  onValueBlur(event: FocusEvent, indexValue: number) {
    this.values[indexValue] = event.target['value'];
  }

  addStepVarValue() {
    this.values = [
      ...this.values,
      this.newStepVarValue
    ];
    this.newStepVarValue = null;
  }

  trackByFn(indexValue: number, value: string) {
    return value;
  }

  resetStepVar() {
    this.stepVar = this._stepVar;
  }

  saveStepVar() {
    this.bddService.saveStepVar(<StepVar>{
      ...this._stepVar,
      ...this.formGroup.getRawValue(),
      values: this.values.filter(value => !!value)
    })
      .subscribe(() => this.modal.success({ message: 'La variable a été sauvegardée.' }));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
