import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

import { SharedModule } from '../../shared.module';
import { HeaderComponent } from './header.component';
import { UserLoginModule } from '../user-login/user-login.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    SharedModule,
    MatToolbarModule,
    UserLoginModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
