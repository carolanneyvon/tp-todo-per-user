import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private _baseUrl = environment.baseUrl + '/users';
  public users$ = new BehaviorSubject<User[]>([]);
  public selectedUser$ = new BehaviorSubject<User | null>(null);
  // private usersSubject = new BehaviorSubject<User[]>([]);
  // users$ = this.usersSubject.asObservable();

  constructor(private _http: HttpClient) { }

  // getUsers() {
  //   return this._http
  //   .get<User[]>(this._baseUrl)
  //   .subscribe(usersFromApi => {
  //     this.users$.next(usersFromApi);
  //   });
  // }

  getUsers(): Observable<User[]> {
    return this._http
    .get<User[]>(this._baseUrl);
  }

  selectUser(user: User) {
    this.users$.next([user]);
  }

  // getUserById(id: string): Observable<User> {
  //   const url = `${this._baseUrl}/${id}`;
  //   return this._http.get<User>(url);
  // }

  // updateUser(user: User): Observable<User> {
  //   const url = `${this._baseUrl}/${user.id}`;
  //   return this._http.put<User>(url, user);
  // }
}

