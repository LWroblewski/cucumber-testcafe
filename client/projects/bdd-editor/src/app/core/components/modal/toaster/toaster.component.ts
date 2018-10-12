import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToasterConfig} from '../modal.model';
import {timer} from 'rxjs';

@Component({
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ToasterComponent>,
              @Inject(MAT_DIALOG_DATA) public config: ToasterConfig) {}

  ngOnInit() {
    timer(2000).subscribe(() => this.dialogRef.close());
  }

  getToasterTypeIcon(): string {
    switch (this.config.type) {
      case 'success':
        return 'check_circle';
      case 'info':
        return 'info';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
    }
  }
}
