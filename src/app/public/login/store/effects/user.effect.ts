import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';
import { Observable } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../models/user.model';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private authService: AuthenticationService) {}

    @Effect()
    loginUserProvider$: Observable<any> = this.actions$.pipe(
        ofType(userActions.LOGIN_USER_WITH_PROVIDER),
        switchMap(() => {
            return this.authService
                .loginWithGoogle()
                .then(
                    (user) => new userActions.LoginUserSuccess(this.mapUser(user)),
                    (err) => new userActions.LoginUserFail(err)
                );
        })
    );

    @Effect()
    loginUser$: Observable<any> = this.actions$.pipe(
        ofType(userActions.LOGIN_USER),
        switchMap((res) => {
            const user = res;
            return this.authService
                .login(user['payload']['email'], user['payload']['password'])
                .then(
                    (user) => new userActions.LoginUserSuccess(this.mapUser(user)),
                    (err) => new userActions.LoginUserFail(err)
                );
        })
    );

    @Effect()
    logoutUser$: Observable<any> = this.actions$.pipe(
        ofType(userActions.LOGOUT_USER),
        switchMap(() => {
            return this.authService
                .logout()
                .then((user) => new userActions.LogoutUserSuccess(), (err) => new userActions.LogoutUserFail(err));
        })
    );

    private mapUser(data): User {
        if (!data.user) {
            return;
        }
        const user = data.user;

        return {
            displayName: user.displayName || null,
            email: user.email || null,
            emailVerified: user.emailVerified || null,
            metadata: {
                creationTime: user.metadata && user.metadata.creationTime ? user.metadata.creationTime : null,
                lastSignInTime: user.metadata && user.metadata.lastSignInTime ? user.metadata.lastSignInTime : null
            },
            phoneNumber: user.phoneNumber || null,
            photoURL: user.photoURL || null,
            uid: user.uid || null,
            refreshToken: user.refreshToken || null
        };
    }
}
