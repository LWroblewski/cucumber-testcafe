import { Action, State, NgxsOnInit, Store, Selector, StateContext } from '@ngxs/store';
import { User } from '../../model/user.model';
import { UserActions } from './user.actions';
import { Navigate } from '@ngxs/router-plugin';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConfiguration, APP_CONFIGURATION } from '../../../app.model';

export interface UserStateModel {
    initialized: boolean;
    user?: User;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    initialized: false,
    user: null,
  }
})
export class UserState implements NgxsOnInit {

  constructor(private store: Store,
              private http: HttpClient,
              @Inject(APP_CONFIGURATION) private config: AppConfiguration) {}

  /**
   * Selectors
   */
  @Selector()
  static getInitialized(state: UserStateModel): boolean {
    return state.initialized;
  }

  @Selector()
  static getUser(state: UserStateModel) {
    return state.user;
  }

  /**
   * Dispatch CheckSession on start
   */
  ngxsOnInit(ctx: StateContext<UserStateModel>) {
    ctx.dispatch(new UserActions.CheckSession());
  }

  /**
   * Commands
   */
  @Action(UserActions.CheckSession)
  checkSession(ctx: StateContext<UserStateModel>) {
    return null;
  }

  @Action(UserActions.Login)
  login(ctx: StateContext<UserStateModel>, action: UserActions.Login) {
    return this.http.get<User>(this.config.urlUsers).pipe(
      map((user: User) => ctx.dispatch(new UserActions.LoginSuccess(user))),
      catchError((error: Error) => ctx.dispatch(new UserActions.LoginFailed(error)))
    );
  }

  /**
   * Events
   */

  @Action(UserActions.LoginSuccess)
  onLoginSuccess(ctx: StateContext<UserStateModel>) {
    ctx.dispatch(new Navigate(['/markets']));
  }

  @Action(UserActions.LoginSuccess)
  setUserStateOnSuccess(ctx: StateContext<UserStateModel>, event: UserActions.LoginSuccess) {
    ctx.patchState({
      user: event.user
    });
  }

  @Action(UserActions.LoginFailed)
  setUserStateOnFailure(ctx: StateContext<UserStateModel>) {
    ctx.patchState({
      user: undefined
    });
  }
}
