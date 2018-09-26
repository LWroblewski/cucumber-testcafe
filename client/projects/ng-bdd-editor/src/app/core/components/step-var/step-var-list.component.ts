import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {StepVar} from '../../../../../../../../shared/model/step-vars.model';

@Component({
  selector: 'app-step-var-list',
  templateUrl: './step-var-list.component.html',
  styleUrls: ['./step-var-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepVarListComponent {

  @Input()
  stepVars: StepVar[];

  @Output()
  stepVarSelected: EventEmitter<StepVar[]> = new EventEmitter<StepVar[]>();

  private _selectedStepVars: StepVar[] = [];

  getStepVarState(stepVar: StepVar): boolean {
    return this._selectedStepVars && this._selectedStepVars.indexOf(stepVar) > -1;
  }

  selectStepVar(event: { selected: boolean }, selectedStepVar: StepVar) {
    if (event.selected) {
      this._selectedStepVars = [
        ...this._selectedStepVars,
        selectedStepVar
      ];
    } else {
      this._selectedStepVars = this._selectedStepVars.filter(stepVar => stepVar.key !== selectedStepVar.key);
    }
  }

  selectOrUnselectAll() {
    this._selectedStepVars = this.isAllSelected() ? [] : [ ...this.stepVars ];
  }

  getSelectAllLabel(): string {
    return this.isAllSelected() ? 'Déselectionner tout' : 'Sélectionner tout';
  }

  isAllSelected(): boolean {
    return this._selectedStepVars.length === this.stepVars.length;
  }

  addStepVars() {
    this.stepVarSelected.emit(this._selectedStepVars);
    this._selectedStepVars = [];
  }

  enableAddButton(): boolean {
    return this._selectedStepVars && this._selectedStepVars.length > 0;
  }
}
