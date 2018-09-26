import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonaData} from '../../../../../../../../../shared/model/persona.model';
import {MatDialog} from '@angular/material';
import {StepVar} from '../../../../../../../../../shared/model/step-vars.model';
import {StepVarEditComponent} from '../../step-var/step-var-edit.component';
import {ModalService} from '../../modal/modal.service';
import {moveElement} from '../../../../../../../../../shared/utils/array-utils';
import {filter} from "rxjs/internal/operators";

@Component({
  selector: 'app-persona-data-list',
  templateUrl: './persona-data-list.component.html',
  styleUrls: ['./persona-data-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonaDataListComponent {

  @Input()
  stepVars: StepVar[];

  @Input()
  personaData: PersonaData[];

  @Input()
  title: string;

  @Output()
  personaDataChanged: EventEmitter<PersonaData[]> = new EventEmitter<PersonaData[]>();

  constructor(private modal: ModalService,
              private dialog: MatDialog,
              private changeDetector: ChangeDetectorRef) {}

  editPersonaData(personaData: PersonaData) {
    const stepVar: StepVar = this.stepVars.find(data => data.key === personaData.key);
    this.dialog.open(StepVarEditComponent, { data: { stepVar, selectedValue: personaData.value } })
      .afterClosed()
      .pipe(
        filter(result => result !== undefined)
      )
      .subscribe(selectedValue => this.onPersonaDataValueSelected(personaData, selectedValue));
  }

  private onPersonaDataValueSelected(personaData: PersonaData, selectedValue: string) {
    personaData.value = selectedValue;
    this.modal.success({ message: `La valeur ${selectedValue} a été affectée à la variable ${personaData.key}.` });
    this.onPersonaDataEdited();
  }

  getPersonaDataLabel(personaData: PersonaData): string {
    const dataStepVar: StepVar = this.stepVars ? this.stepVars.find(stepVar => stepVar.key === personaData.key) : null;
    return dataStepVar ? dataStepVar.label : personaData.key;
  }

  deletePersonaData(personaData: PersonaData) {
    this.modal.confirm({
      title: 'Suppression',
      message: 'Souhaitez-vous supprimer cette variable de ce Persona?'
    })
      .pipe(
        filter(result => !!result)
      )
      .subscribe(() => this.onConfirmDeletePersonaData(personaData));
  }

  private onConfirmDeletePersonaData(personaData: PersonaData) {
    this.personaData = this.personaData.filter(data => data.key !== personaData.key);
    this.onPersonaDataEdited();
  }

  onDragEnded(event: {indexSource: number, indexTarget: number}) {
    this.personaData = moveElement(this.personaData, event.indexSource, event.indexTarget);
    this.onPersonaDataEdited();
  }

  private onPersonaDataEdited() {
    this.changeDetector.markForCheck();
    this.personaDataChanged.emit(this.personaData);
  }
}
