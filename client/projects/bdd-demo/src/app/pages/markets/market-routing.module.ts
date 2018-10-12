import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketsComponent } from './markets.component';
import { ListMarketsComponent } from './components/list-markets/list-markets.component';
import { DetailMarketComponent } from './components/detail-market/detail-market.component';


const routes: Routes = [
  {
    path: '',
    component: MarketsComponent,
    children: [
      { path: '', component: ListMarketsComponent },
      { path: 'detail/:id', component: DetailMarketComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketsRoutingModule { }
