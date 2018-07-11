import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthActionTypes, Login, LoginSuccess, LoginFailure } from '../actions/auth';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Authenticate } from '../models/user';
import { of } from 'rxjs';


@Injectable({
    providedIn:'root'
})
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}
    @Effect()    
    login$ = this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        map((action:Login) => action.payload),
        exhaustMap( (auth:Authenticate) => 
            this.authService
                .login(auth)
                .pipe(
                    map(user => new LoginSuccess( {user})),
                    catchError(error => of(new LoginFailure(error)))
                )
        
            )
        ); 
    
    @Effect({ dispatch: false })
    loginSuccess$ =  this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(() => this.router.navigate(['']))
    );

    @Effect( { dispatch: false})
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
        tap(authed => {
            this.router.navigate(['/login']);
        })
    );
}