import {NgModule} from '@angular/core';
import {ConfirmComponent} from './confirm/confirm.component';
import {ModalService} from './modal.service';
import {ToasterComponent} from './toaster/toaster.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ConfirmComponent,
    ToasterComponent
  ],
  entryComponents: [
    ConfirmComponent,
    ToasterComponent
  ],
  providers: [
    ModalService
  ]
})
export class ModalModule { }
