import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {path: 'home', component: HomeComponent},
  {path: 'markets', loadChildren: './pages/markets/markets.module#MarketsModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      enableTracing: false
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
