import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ProjectAddComponent} from './project-add/project-add.component';

@NgModule({
  declarations: [
    ProjectAddComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ProjectAddComponent
  ],
  entryComponents: [
    ProjectAddComponent
  ]
})
export class ProjectModule { }
