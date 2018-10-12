import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserActions } from '../../redux/user/user.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserState } from '../../redux/user/user.state';

@Component({
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent implements OnInit {

  private group: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserLoginComponent>,
              private store: Store) {}

  ngOnInit() {
    this.group = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login() {
    this.store.dispatch(new UserActions.Login(this.group.getRawValue())).subscribe(
      () => this.dialogRef.close()
    );
  }
}
