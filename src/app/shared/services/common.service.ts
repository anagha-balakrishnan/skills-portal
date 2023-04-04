import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { DEFAULT_USER } from '../data';
import { Iuser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private loggedInUserStream = new ReplaySubject<Iuser | null>(1);
  loggedInUserStream$ = this.loggedInUserStream.asObservable();

  constructor() { }

  getLoggedInUser() {
    // API call here
    this.updateLoggedInUserStream(DEFAULT_USER);
  }

  updateLoggedInUserStream(user: Iuser | null) {
    if (user?.eid) {
      this.loggedInUserStream.next(user);
    } else {
      this.loggedInUserStream.next(null);
    }
  }
}
