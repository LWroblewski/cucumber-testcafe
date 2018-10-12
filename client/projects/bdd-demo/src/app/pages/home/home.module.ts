import {NgModule} from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../core/shared.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
