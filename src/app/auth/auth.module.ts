import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [LoginComponent, LoginFormComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: []
    }
  }
 }

 @NgModule({
   imports: [
     AuthModule,
     StoreModule.forFeature('auth', reducers),
     RouterModule.forChild([{path: 'login', component: LoginComponent}])
   ]
 })
 export class RootAuthModule {}
