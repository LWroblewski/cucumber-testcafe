import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BDDService} from '../../core/services/bdd.service';
import {newPersona, Persona, PersonaData} from '../../../../../../../shared/model/persona.model';
import {Observable, of, Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../core/components/modal/modal.service';
import {StepVar} from '../../../../../../../shared/model/step-vars.model';
import {MatDialog} from '@angular/material';
import {filter, map, switchMap} from 'rxjs/internal/operators';

@Component({
  templateUrl: './page-persona.component.html',
  styleUrls: ['./page-persona.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagePersonaComponent implements OnInit, OnDestroy {

  private _persona: Persona;

  set persona(value: Persona) {
    this._persona = value;
    this.personaData = this._persona && this._persona.data ? [ ...this._persona.data ] : [];
    if (this.formGroup) {
      this.formGroup.patchValue(this._persona);
    }
  }

  get persona(): Persona {
    return this._persona;
  }

  personaData: PersonaData[];

  private subscription$: Subscription;

  formGroup: FormGroup;

  stepVars$: Observable<StepVar[]>;

  constructor(private bddService: BDDService,
              private route: ActivatedRoute,
              private modal: ModalService,
              private dialog: MatDialog,
              private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.stepVars$ = this.bddService.getStepVars();
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(),
      link: new FormControl()
    });
    this.subscription$ = this.route.paramMap
      .pipe(
        map((params: ParamMap) => [ params.get('projectKey'), params.get('personaId') ]),
        switchMap(([project, personaId]) => personaId ? this.bddService.getPersona(personaId) : of({ ...newPersona(), project }))
      )
      .subscribe(persona => this.persona = persona);
  }

  resetPersona() {
    this.modal.confirm({
      title: 'Annulation',
      message: 'Souhaitez-vous annuler les modifications apportées à ce Persona?'
    })
      .pipe(
        filter(result => !!result)
      )
      .subscribe(() => this.persona = this._persona);
  }

  onStepVarSelected(stepVars: StepVar[]) {
    const addedStepVars: PersonaData[] = stepVars
      .filter(stepVar => this.personaData.find(data => data.key === stepVar.key) === undefined)
      .map(stepVar => ({ key: stepVar.key, value: null }));
    if (addedStepVars.length === 0) {
      this.modal.warning({ message: `La(les) variable(s) sélectionnée(s) est(sont) déjà paramétrée(s) pour ce Persona.` });
    } else {
      this.personaData = [
        ...this.personaData,
        ...addedStepVars
      ];
    }
  }

  savePersona() {
    this.bddService.savePersona(<Persona>{
      ...this._persona,
      ...this.formGroup.getRawValue(),
      data: this.personaData
    })
      .subscribe(() => {
        this.modal.success({ message: `Le persona a été sauvegardé.` });
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
