import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MarketState } from '../../../../core/redux/market/market.state';
import { Market } from '../../../../core/model/market.model';

@Component({
  selector: 'app-list-markets',
  templateUrl: './list-markets.component.html',
  styleUrls: ['./list-markets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMarketsComponent implements OnInit {

  @Select(MarketState.getMarkets)
  markets$: Observable<Market[]>;

  displayedColumns: string[] = ['id', 'operatorName', 'actions'];

  constructor() { }

  ngOnInit() {}

  editMarket(market: Market) {

  }

  deleteMarket(market: Market) {
    
  }
}
