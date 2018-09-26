import {NgModule} from '@angular/core';
import {StepsListComponent} from './steps-list.component';
import {SharedModule} from '../../shared/shared.module';
import {StepsCategoriesComponent} from './steps-categories.component';

@NgModule({
  declarations: [
    StepsListComponent,
    StepsCategoriesComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    StepsListComponent,
    StepsCategoriesComponent
  ]
})
export class StepsModule { }
