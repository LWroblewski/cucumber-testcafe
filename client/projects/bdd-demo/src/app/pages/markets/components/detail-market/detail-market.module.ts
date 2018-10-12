import {NgModule} from '@angular/core';
import { DetailMarketComponent } from './detail-market.component';
import { SharedModule } from '../../../../core/shared.module';

@NgModule({
  declarations: [
    DetailMarketComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DetailMarketComponent
  ]
})
export class DetailMarketModule { }
