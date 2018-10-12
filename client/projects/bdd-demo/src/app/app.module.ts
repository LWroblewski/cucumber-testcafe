import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { SharedModule } from './core/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderModule } from './core/components/header/header.module';
import { AppRoutingModule } from './app-routing.module';
import { APP_CONFIGURATION } from './app.model';
import { UserState } from './core/redux/user/user.state';
import { HomeModule } from './pages/home/home.module';
import { MarketState } from './core/redux/market/market.state';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HeaderModule,
    NgxsModule.forRoot([ UserState ]),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    HomeModule
  ],
  providers: [
    { provide: APP_CONFIGURATION, useValue: environment },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
