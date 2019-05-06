import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UserFormType } from '../../UserFormType';

export const LOGIN_USER = '[User] Login User';
export const LOGIN_USER_WITH_PROVIDER = '[User] Login User with Provider';
export const LOGIN_USER_FAIL = '[User] Login User Fail';
export const LOGIN_USER_SUCCESS = '[User] Login User Success';
export const LOGOUT_USER = '[User] Logout User';
export const LOGOUT_USER_FAIL = '[User] Logout User Fail';
export const LOGOUT_USER_SUCCESS = '[User] Logout User Success';

export class LoginUser implements Action {
    readonly type = LOGIN_USER;
    constructor(public payload: UserFormType) {}
}

export class LoginUserWithProvider implements Action {
    readonly type = LOGIN_USER_WITH_PROVIDER;
}

export class LoginUserFail implements Action {
    readonly type = LOGIN_USER_FAIL;
    constructor(public payload: any) {}
}

export class LoginUserSuccess implements Action {
    readonly type = LOGIN_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class LogoutUser implements Action {
    readonly type = LOGOUT_USER;
}

export class LogoutUserFail implements Action {
    readonly type = LOGOUT_USER_FAIL;
    constructor(public payload: any) {}
}

export class LogoutUserSuccess implements Action {
    readonly type = LOGOUT_USER_SUCCESS;
}

export type LoginAction =
    | LoginUser
    | LoginUserWithProvider
    | LoginUserFail
    | LoginUserSuccess
    | LogoutUser
    | LogoutUserFail
    | LogoutUserSuccess;
