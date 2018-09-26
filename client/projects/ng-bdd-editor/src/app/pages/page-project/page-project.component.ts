import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BDDService} from '../../core/services/bdd.service';
import {Observable, of} from 'rxjs';
import {File} from '../../../../../../../shared/model/file.model';
import {USCategory} from '../../../../../../../shared/model/us-step.model';
import {ModalService} from '../../core/components/modal/modal.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {StepVar} from '../../../../../../../shared/model/step-vars.model';
import {filter, map, switchMap} from 'rxjs/internal/operators';

@Component({
  templateUrl: './page-project.component.html',
  styleUrls: ['./page-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageProjectComponent implements OnInit {

  usCategories$: Observable<USCategory[]>;
  personasFiles$: Observable<File[]>;
  stepVars$: Observable<StepVar[]>;
  private projectKey$: Observable<string>;

  constructor(private route: ActivatedRoute,
              private bddService: BDDService,
              private modal: ModalService,
              private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.projectKey$ = this.route.paramMap
      .pipe(
        map((params: ParamMap) => params.get('projectKey'))
      );
    this.initUS();
    this.initPersonas();
    this.initStepVars();
  }

  private initUS() {
    this.usCategories$ = this.projectKey$
      .pipe(
        switchMap(projectKey => projectKey ? this.bddService.getUSCategories(projectKey) : of([]))
      );
  }

  private initPersonas() {
    this.personasFiles$ = this.projectKey$
      .pipe(
        switchMap(projectKey => projectKey ? this.bddService.getPersonas(projectKey) : of([]))
      );
  }

  private initStepVars() {
    this.stepVars$ = this.projectKey$
      .pipe(
        switchMap(projectKey => projectKey ? this.bddService.getStepVars() : of([]))
      );
  }

  deleteUS(idUS: string) {
    this.modal.confirm({
      title: 'Suppression d\'US',
      message: 'Souhaitez-vous supprimer cette US?'
    })
      .pipe(
        filter(result => !!result),
        switchMap(() => this.bddService.deleteUS(idUS))
      )
      .subscribe(() => this.onUSDeleted());
  }

  private onUSDeleted() {
    this.modal.toast({
      message: `L'US a été supprimée.`
    });
    this.usCategories$ = this.projectKey$
      .pipe(
        switchMap(projectKey => projectKey ? this.bddService.getUSCategories(projectKey) : of([]))
      );
    this.changeDetector.markForCheck();
  }

  deletePersona(idPersona: string) {
    this.modal.confirm({
      title: 'Suppression de Persona',
      message: 'Souhaitez-vous supprimer ce Persona?'
    })
      .pipe(
        filter(result => !!result),
        switchMap(() => this.bddService.deletePersona(idPersona))
      )
      .subscribe(() => {
        this.modal.success({ message: 'Le persona a été supprimé' });
        this.initPersonas();
        this.changeDetector.markForCheck();
      });
  }

  deleteStepVar(stepVarId: string) {
    this.modal.confirm({
      title: 'Suppression de Variable métier',
      message: 'Souhaitez-vous supprimer cette variable?'
    })
      .pipe(
        filter(result => !!result)
      )
      .subscribe(() => this.bddService.deleteStepVar(stepVarId));
  }
}
