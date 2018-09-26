import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {StepVarListComponent} from './step-var-list.component';
import {StepVarEditComponent} from './step-var-edit.component';
import {StepVarSortPipe} from '../../utils/step-var-sort.pipe';

@NgModule({
  declarations: [
    StepVarSortPipe,
    StepVarListComponent,
    StepVarEditComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    StepVarSortPipe,
    StepVarListComponent,
    StepVarEditComponent
  ],
  entryComponents: [
    StepVarEditComponent
  ]
})
export class StepVarModule { }
