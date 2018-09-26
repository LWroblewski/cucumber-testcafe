import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ModalConfirmConfig} from '../modal.model';

@Component({
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public config: ModalConfirmConfig) {}
}
