import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MatListModule} from '@angular/material';
import {PersonasListComponent} from './personas-list/personas-list.component';
import {PersonaDataListComponent} from './persona-data-list/persona-data-list.component';

@NgModule({
  declarations: [
    PersonasListComponent,
    PersonaDataListComponent
  ],
  imports: [
    SharedModule,
    MatListModule
  ],
  exports: [
    PersonasListComponent,
    PersonaDataListComponent
  ]
})
export class PersonasModule { }
