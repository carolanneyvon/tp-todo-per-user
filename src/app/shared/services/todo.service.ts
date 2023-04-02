import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Todo } from 'src/app/shared/models/todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private _baseUrl = environment.baseUrl + '/users';
  public todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private _http: HttpClient) { 
    this.findAll();
  }

  //GET
  public findAll() {
    this._http
    .get<Todo[]>(this._baseUrl)
    .subscribe(todosFromApi => { //observable, il faut donc s'abonner, fonction qui récupère toutes les todos à la connexion
      this.todos$.next(todosFromApi)//met à jour le BehaviorSubject
    });
  }

  //POST
  public createTodo(todo: Todo) {
    return this._http
      .post<Todo>(this._baseUrl, todo)
      .pipe(
        tap(() => setTimeout(() => {
          this.findAll();
        }, 500))
      );
  }

  //PUT
  public updateTodo(todo: Todo) {
    this._http
      .put<Todo>(`${this._baseUrl}/${todo.id}`, todo)
      .subscribe(() => this.findAll());
  }

  //DELETE
  public deleteTodo(id?: string) {
    if (id) {
      this._http
        .delete<Todo>(`${this._baseUrl}/${id}`)
        .subscribe(() => this.findAll());
    }
  }

  // getTodoByUser(userId: string): Observable<Todo[]> {
  //   const url = `${this._baseUrl}?userId=${userId}`;
  //   return this._http.get<Todo[]>(url);
  // }

  // getTodoByCategory(category: string): Observable<Todo[]> {
  //   const url = `${this._baseUrl}?category=${category}`;
  //   return this._http.get<Todo[]>(url);
  // }
}
