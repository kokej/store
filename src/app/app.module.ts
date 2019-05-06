import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngMatModule } from './common/ang-mat/ang-mat.module';
import { LoginModule } from './public/login/login.module';
import { HomeComponent } from './public/home/home.component';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

const firebase = {
    apiKey: 'AIzaSyB7UK6myQ46umsRa0WdQHBR0RqRyjxVEwo',
    authDomain: 'user-manager-5aa3d.firebaseapp.com',
    databaseURL: 'https://user-manager-5aa3d.firebaseio.com',
    projectId: 'user-manager-5aa3d',
    storageBucket: 'user-manager-5aa3d.appspot.com',
    messagingSenderId: '413823349307'
};

@NgModule({
    declarations: [ AppComponent, HomeComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngMatModule,
        LoginModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebase),
        AngularFireAuthModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ AppEffects ]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
