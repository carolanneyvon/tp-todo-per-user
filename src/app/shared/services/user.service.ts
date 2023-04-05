import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private _baseUrl = environment.baseUrl + '/users';
  public users$ = new BehaviorSubject<User[]>([]);
  public selectedUser$ = new BehaviorSubject<User | null>(null);
  public userTodos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private _http: HttpClient, private todoService: TodoService) { }

  //GET
  getUsers(): Observable<User[]> {
    return this._http
    .get<User[]>(this._baseUrl);
  }

  selectUser(user: User) {
    this.selectedUser$.next(user);
      if (user.id){
        this.todoService.getTodosForUser(user.id).subscribe(todos => this.userTodos$.next(todos));
      }
  }

  //GET todo for User
  getTodoForUser(id_user: string): Observable<Todo[]> {
    const url = `${this._baseUrl}/${id_user}/todos`;
    return this._http
    .get<Todo[]>(url);
  }

}

