import { Action, NgxsOnInit, Store, State, Selector, StateContext } from '@ngxs/store';
import { Market } from '../../model/market.model';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { AppConfiguration, APP_CONFIGURATION } from '../../../app.model';
import { MarketActions } from './market.actions';
import { catchError, map, tap } from 'rxjs/operators';

export interface MarketStateModel {
    markets: Market[];
    currentMarket: Market;
}

@State<MarketStateModel>({
  name: 'market',
  defaults: {
    markets: null,
    currentMarket: null
  }
})
export class MarketState implements NgxsOnInit {
  constructor(private store: Store,
      private http: HttpClient,
      @Inject(APP_CONFIGURATION) private config: AppConfiguration) {}

  @Selector()
  static getMarkets(state: MarketStateModel) {
    return state.markets;
  }

  @Selector()
  static getCurrentMarket(state: MarketStateModel) {
    return state.currentMarket;
  }

  ngxsOnInit(ctx: StateContext<MarketStateModel>) {
      ctx.dispatch(new MarketActions.LoadMarkets());
  }

  @Action(MarketActions.LoadMarkets)
  loadMarkets(ctx: StateContext<MarketStateModel>) {
    return this.http.get<Market[]>(this.config.urlMarkets).pipe(
      map((markets: Market[]) => ctx.dispatch(new MarketActions.LoadMarketsSuccess(markets))),
      catchError((error: Error) => ctx.dispatch(new MarketActions.LoadMarketsFailed(error)))
    );
  }

  @Action(MarketActions.LoadMarketsSuccess)
  setMarketsStateOnSuccess(ctx: StateContext<MarketStateModel>, {markets}: MarketActions.LoadMarketsSuccess) {
    ctx.patchState({markets});
  }

  @Action(MarketActions.GetMarketDetailSuccess)
  setMarketStateOnSuccess(ctx: StateContext<MarketStateModel>, {market}: MarketActions.GetMarketDetailSuccess) {
    ctx.patchState({currentMarket: market});
  }
}
