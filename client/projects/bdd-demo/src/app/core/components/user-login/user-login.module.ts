import {NgModule} from '@angular/core';

import { SharedModule } from '../../shared.module';
import { UserLoginComponent } from './user-login.component';

@NgModule({
  declarations: [
    UserLoginComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [
    UserLoginComponent
  ],
  exports: [
    UserLoginComponent
  ]
})
export class UserLoginModule { }
