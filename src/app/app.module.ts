import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
    AuthModule,
    StoreModule.forRoot(reducers, {metaReducers})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
