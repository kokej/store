import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngMatModule } from '../../common/ang-mat/ang-mat.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { RegisterComponent } from './register/register.component';
import { UserDataComponent } from './user-data/user-data.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

@NgModule({
    imports: [
        CommonModule,
        AngMatModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('user', reducers),
        EffectsModule.forFeature(effects)
    ],
    declarations: [
        LoginComponent,
        LoginUserComponent,
        ForgottenPasswordComponent,
        RegisterComponent,
        UserDataComponent
    ],
    exports: [ LoginComponent ]
})
export class LoginModule {}
