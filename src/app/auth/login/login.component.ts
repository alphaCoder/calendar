import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';
import { Authenticate } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));
  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
  }
  onSubmit($event: Authenticate) {
    this.store.dispatch(new Auth.Login($event));
  }
}
