import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Todo } from 'src/app/shared/models/todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private _baseUrl = environment.baseUrl + '/todos';
  public todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private _http: HttpClient) { 
    this.findAll();
  }

  //GET
  public findAll() {
    this._http
    .get<Todo[]>(this._baseUrl)
    .subscribe(todosFromApi => { 
      this.todos$.next(todosFromApi)
    });
  }

  //GET todo by user
  getTodoByUser(id_user?: string) {
    const url = `${this._baseUrl}?id_user=${id_user}`;
    return this._http
    .get<Todo[]>(url)
    .subscribe(() => this.findAll());
  }

  //GET todo by category
  getTodoByCategory(category?: string) {
    const url = `${this._baseUrl}?category=${category}`;
    this._http
    .get<Todo[]>(url)
    .subscribe(() => this.findAll());
  }

  //GET todo by category and user
  getTodoByCategoryAndUser(category?: string, id_user?: string) {
    const url = `${this._baseUrl}?category=${category}&id_user=${id_user}`;
    return this._http
    .get<Todo[]>(url);
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
    const url = `${this._baseUrl}/${todo.id}`;
    return this._http
      //.put<Todo>(`${this._baseUrl}/${todo.id}`, todo)
      .put(url, todo)
      .subscribe(() => this.findAll());
  }

  //DELETE
  public deleteTodo(id?: string) {
    if (id) {
      const url = `${this._baseUrl}/${id}`;
      this._http
        //.delete<Todo>(`${this._baseUrl}/${id}`)
        .delete(url)
        .subscribe(() => this.findAll());
    }
  }

  //Filter todos for pending (à faire) or completed (terminées)
  public filterTodos(todos: Todo[]) {
    const pendingTodos = todos.filter(todo => todo.done === false);
    const completedTodos = todos.filter(todo => todo.done === true);
    this.todos$.next([ ...pendingTodos, ...completedTodos ]);
  }

  //GET todos for user
  getTodosForUser(id_user: string) {
    return this.todos$.pipe(
      map(todos => todos.filter(todo => todo.id_user === id_user))
    );
  }

  public filterTodosByUser(todos: Todo[], id_user: string) {
    const todosForUser = todos.filter(todo => todo.id_user === id_user);
    this.todos$.next(todosForUser);
  }
}
