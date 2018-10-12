import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap, map, filter, mergeMap, first } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { MarketState } from '../../../../core/redux/market/market.state';
import { Market } from '../../../../core/model/market.model';
import { MarketActions } from '../../../../core/redux/market/market.actions';

@Component({
  templateUrl: './detail-market.component.html',
  styleUrls: ['./detail-market.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailMarketComponent implements OnInit, OnDestroy {

  @Select(MarketState.getCurrentMarket)
  market$: Observable<Market>;

  subscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.subscription = this.route.params.pipe(
      filter(params => !!params.id),
      first(),
      map(params => params.id)
    ).subscribe(id => this.store.dispatch(new MarketActions.GetMarketDetail(id)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
