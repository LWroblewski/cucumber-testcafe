import {MatDialog} from '@angular/material';
import {ConfirmComponent} from './confirm/confirm.component';
import {Injectable} from '@angular/core';
import {ModalConfirmConfig, ToasterConfig} from './modal.model';
import {ToasterComponent} from './toaster/toaster.component';
import {Observable} from 'rxjs';

@Injectable()
export class ModalService {

  constructor(private dialog: MatDialog) {}

  confirm(data: ModalConfirmConfig) {
    return this.dialog.open(ConfirmComponent, { data }).afterClosed();
  }

  toast(data: ToasterConfig): Observable<any> {
    return this.dialog.open(ToasterComponent, {
      panelClass: 'modal-transparent-panel',
      backdropClass: 'modal-backdrop-transparent',
      data
    }).afterClosed();
  }

  success(data: ToasterConfig): Observable<any> {
    return this.toast(<ToasterConfig>{
      ...data,
      type: 'success'
    });
  }

  info(data: ToasterConfig): Observable<any> {
    return this.toast(<ToasterConfig>{
      ...data,
      type: 'info'
    });
  }

  warning(data: ToasterConfig): Observable<any> {
    return this.toast(<ToasterConfig>{
      ...data,
      type: 'warning'
    });
  }

  error(data: ToasterConfig): Observable<any> {
    return this.toast(<ToasterConfig>{
      ...data,
      type: 'error'
    });
  }
}
