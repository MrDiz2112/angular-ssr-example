import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { MOCK_USERS, User } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getUsers(): Observable<User[]> {
    return of(MOCK_USERS).pipe(delay(1000));
  }
}
