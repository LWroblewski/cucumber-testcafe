import {NgModule} from '@angular/core';

import { ListMarketsComponent } from './list-markets.component';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from '../../../../core/shared.module';

@NgModule({
  declarations: [
    ListMarketsComponent
  ],
  imports: [
    SharedModule,
    MatTableModule
  ],
  exports: [
    ListMarketsComponent
  ]
})
export class ListMarketsModule { }
