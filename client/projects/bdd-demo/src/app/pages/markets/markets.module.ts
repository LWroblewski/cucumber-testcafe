import {NgModule} from '@angular/core';

import { MarketsComponent } from './markets.component';
import { MarketsRoutingModule } from './market-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ListMarketsModule } from './components/list-markets/list-markets.module';
import { DetailMarketModule } from './components/detail-market/detail-market.module';
import { MarketState } from '../../core/redux/market/market.state';
import { SharedModule } from '../../core/shared.module';

@NgModule({
  declarations: [
    MarketsComponent
  ],
  imports: [
    SharedModule,
    MarketsRoutingModule,
    NgxsModule.forFeature([ MarketState ]),
    ListMarketsModule,
    DetailMarketModule
  ]
})
export class MarketsModule { }
