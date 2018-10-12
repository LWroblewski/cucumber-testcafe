import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';
import { Select } from '@ngxs/store';
import { UserState } from '../../redux/user/user.state';
import { User } from '../../model/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Select(UserState.getUser)
  currentUser$: Observable<User>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginDialog() {
    this.dialog.open(UserLoginComponent);
  }

}
