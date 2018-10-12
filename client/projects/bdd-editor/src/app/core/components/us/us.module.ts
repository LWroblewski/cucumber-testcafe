import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {UsListComponent} from './us-list/us-list.component';
import {UsBuilderComponent} from './us-builder/us-builder.component';
import {UsStepEditComponent} from './us-step-edit/us-step-edit.component';
import {UsConditionsComponent} from './us-conditions/us-conditions.component';
import {StepVarModule} from '../step-var/step-var.module';
import {PersonasModule} from "../persona/personas.module";

@NgModule({
  declarations: [
    UsListComponent,
    UsBuilderComponent,
    UsStepEditComponent,
    UsConditionsComponent
  ],
  imports: [
    SharedModule,
    StepVarModule,
    PersonasModule
  ],
  exports: [
    UsListComponent,
    UsBuilderComponent,
    UsStepEditComponent,
    UsConditionsComponent
  ],
  entryComponents: [
    UsStepEditComponent,
    UsConditionsComponent
  ]
})
export class UsModule { }
