import { User } from '../../model/user.model';

export namespace UserActions {
    export class CheckSession {
        static type = '[USER] CheckSession';
    }
    
    export class Login {
        static type = '[USER] Login';
        constructor(public credentials: { login: string, password: string }) {}
    }

    export class LoginSuccess {
        static type = '[USER] LoginSuccess';
        constructor(public user: User) {}
    }

    export class LoginFailed {
        static type = '[USER] LoginFailed';
        constructor(public error: Error) {}
    }
}
