import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { FirebaseUser } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public authState: Subscription = new Subscription();
    constructor(public angularFireAuth: AngularFireAuth) {
        this.authState = this.angularFireAuth.authState.subscribe((userResponse) => {
            if (userResponse) {
                console.log('service --> ', userResponse.displayName, userResponse.email);
                // todo dispatch
            } else {
                console.log('logout');
                // todo dispatch
            }
        });
    }

    async login(email: string, password: string) {
        return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    async register(email: string, password: string) {
        return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    async sendEmailVerification() {
        return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
    }

    async sendPasswordResetEmail(passwordResetEmail: string) {
        return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
    }

    async logout() {
        return await this.angularFireAuth.auth.signOut();
    }

    async loginWithGoogle() {
        return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
}
