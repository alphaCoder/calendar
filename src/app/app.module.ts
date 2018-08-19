import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './shared/utils';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      name: 'Calender App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router',
    }),
    EffectsModule.forRoot([]),
    DashboardModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [
     /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
