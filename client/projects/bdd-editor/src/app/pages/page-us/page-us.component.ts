import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BDDService} from '../../core/services/bdd.service';
import {Observable, of, Subject} from 'rxjs';
import {getStepKeyFromSentence, newUS, Step, StepCategory, US, USCategory, USStep, usStepToString} from '../../../../../../../shared/model/us-step.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UsStepEditComponent} from '../../core/components/us/us-step-edit/us-step-edit.component';
import {ModalService} from '../../core/components/modal/modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsConditionsComponent} from '../../core/components/us/us-conditions/us-conditions.component';
import {filter, map, switchMap, takeUntil} from "rxjs/internal/operators";
import {PersonaData} from '../../../../../../../shared/model/persona.model';
import {moveElement} from '../../../../../../../shared/utils/array-utils';

@Component({
  templateUrl: './page-us.component.html',
  styleUrls: ['./page-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageUsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  usSteps: USStep[];
  private _currentUS: US;

  set currentUS(value: US) {
    this._currentUS = value;
    if (this._currentUS) {
      if (this.formGroup) {
        this.formGroup.patchValue(this._currentUS);
      }
      this.usConditions = this._currentUS.conditions ? [ ...this._currentUS.conditions ] : [];
      this.usSteps = this._currentUS.steps ? [ ...this._currentUS.steps ] : [];
      this.usCategories$ = this._currentUS.project ? this.bddService.getUSCategories(this._currentUS.project)
        .pipe(map(categories => categories.filter(category => (<USCategory>category).children !== null))) : of([]);
    }
  }

  stepsCategories$: Observable<StepCategory[]>;
  usCategories$: Observable<(USCategory | US)[]>;
  usConditions: PersonaData[];

  get strUsConditions(): string {
    return this.usConditions ? this.usConditions.map(condition => condition.key).join(', ') : '';
  }

  formGroup: FormGroup;

  constructor(private bddService: BDDService,
              private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private modal: ModalService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      title: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      link: new FormControl(null, Validators.required)
    });

    this.stepsCategories$ = this.bddService.getStepCategories();
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => [ params.get('projectKey'), params.get('usId') ]),
        switchMap(([project, usId]) => usId ? this.bddService.getUS(usId) : of({ ...newUS(), project })),
        takeUntil(this.destroy$)
      )
      .subscribe(us => this.currentUS = us);
  }

  onStepAdded(step: Step) {
    this.usSteps = [
      ...this.usSteps,
      { stepKey: getStepKeyFromSentence(step.sentence) }
    ];
  }

  getStepLabel(usStep: USStep): string {
    return usStepToString(usStep);
  }

  onDragEnded(event: {indexSource: number, indexTarget: number}) {
    this.usSteps = moveElement(this.usSteps, event.indexSource, event.indexTarget);
  }

  removeStep(usStep: USStep) {
    this.usSteps = this.usSteps.filter(step => usStep !== step);
  }

  editUSStep(data: USStep, indexStep: number) {
    this.dialog.open(UsStepEditComponent, {
      data,
      panelClass: 'dialog-modal-container'
    })
      .afterClosed()
      .pipe(
        filter(usStep => !!usStep),
        takeUntil(this.destroy$)
      )
      .subscribe(usStep => {
        this.usSteps[indexStep] = usStep;
        this.changeDetectorRef.markForCheck();
      });
  }

  resetUS() {
    this.modal.confirm({
      title: 'Annulation',
      message: 'Souhaitez-vous annuler les modifications apportées sur cette US?'
    })
      .pipe(
        filter(result => !!result)
      )
      .subscribe(() => this.currentUS = this._currentUS);
  }

  saveUS() {
    this.bddService
      .saveUS(<US>{
        ...this._currentUS,
        ...this.formGroup.getRawValue(),
        steps: this.usSteps,
        conditions: this.usConditions
      })
      .subscribe(() => {
        this.modal.success({ message: `L'US a été sauvegardée.` });
      });
  }

  addUsCondition() {
    this.dialog.open(UsConditionsComponent, { data: this.usConditions })
      .afterClosed()
      .pipe(
        filter(result => result !== undefined)
      )
      .subscribe(conditions => this.onConditionsEdited(conditions));
  }

  onConditionsEdited(conditions: PersonaData[]) {
    this.usConditions = conditions;
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
