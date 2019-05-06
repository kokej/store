import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { UserFormType } from './UserFormType';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from './store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
    user: any;
    showLogin: boolean;

    constructor(
        private authService: AuthenticationService,
        private store: Store<fromStore.UserState>,
        private elementRef: ElementRef
    ) {}
    @HostListener('document:mousedown', [ '$event' ])
    onGlobalClick(event): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            // clicked outside => close dropdown list
            this.showLogin = false;
        }
    }

    handleSuccess(res, message?) {
        console.log('success', res, message);
    }

    handleError(err, message?) {
        console.log('error', err, message);
    }

    // SignOut Firebase Session
    logoutUser() {
        this.store.dispatch(new fromStore.LogoutUser());
    }

    // Send link on given email to reset password
    forgotPassword(user) {
        this.authService
            .sendPasswordResetEmail(user.email)
            .then(
                (res) => this.handleSuccess(res, 'Please Check Your Email'),
                (err) => this.handleError(err, err.message)
            );
    }

    // Open Popup to Login with Google Account
    googleLogin() {
        this.store.dispatch(new fromStore.LoginUserWithProvider());
    }

    // Login user with  provided Email/ Password
    loginUser(user) {
        this.store.dispatch(new fromStore.LoginUser(user));
        /*         this.authService
            .login(user.email, user.password)
            .then(
                (res) => this.handleSuccess(res, 'Successfully Logged In!'),
                (err) => this.handleError(err, err.message)
            ); */
    }

    // Register user with  provided Email/ Password
    registerUser(user) {
        this.authService.register(user.email, user.password).then(
            (res) => {
                // Send Varification link in email
                this.authService
                    .sendEmailVerification()
                    .then(
                        (res) => this.handleSuccess(res, 'Registration Successful! Please Verify Your Email'),
                        (err) => this.handleError(err, err.message)
                    );
            },
            (err) => this.handleError(err, err.message)
        );
    }
    handleData(data: UserFormType) {
        if (data.loginProvider) {
            return this.googleLogin();
        }
        switch (data.type) {
            case 'login-user':
                return this.loginUser(data.user);
            case 'register-user':
                return this.registerUser(data.user);
            case 'forgot-pwd':
                return this.forgotPassword(data.user);
            default:
                return;
        }
    }
    ngOnInit() {
        this.store.select(fromStore.getUserState).subscribe((state) => {
            console.log('state --> ', state);
        });
    }
}
