import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Todo } from 'src/app/shared/models/todo';
import { User } from 'src/app/shared/models/user';
import { TodoService } from 'src/app/shared/services/todo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  //selectedUser!: User;
  selectedUser: User | null = null
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  categories: string[] = [];
  filter = 'all';
  categoryFilter = '';
  formTitle = '';
  formButton = '';
  selectedTodo!: Todo | null;

  constructor(private userService: UserService, private todoService: TodoService) { }

  ngOnInit() {
    this.userService.users$.subscribe(users => {
      if (users) {
        this.selectedUser = users[0];
        this.todoService.getTodoByUser(this.selectedUser.id);
      }
    });

    // this.todoService.todos$.subscribe(todos => {
    //   if (todos) {
    //     this.todos = todos;
    //     this.categories = [...new Set(this.todos.map(todo => todo.category || '').filter(Boolean))];
    //     this.getTodoByCategory();
    //   }
    // });

    //combineLatest permet de combiner les observables (todos$ et selectedUsers$)
    combineLatest([this.todoService.todos$, this.userService.selectedUser$])
      .subscribe(([todos, user]) => {
        // if (todos && user) {
        //   this.todos = todos.filter(todo => todo.id_user === user.id);
        //   this.categories = [...new Set(this.todos.map(todo => todo.category || '').filter(Boolean))];
        //   this.getTodoByCategory();
        // }
        if (todos && user) {
          this.todoService.getTodoByCategoryAndUser(this.categoryFilter, user.id).subscribe(filteredTodos => {
            this.todos = filteredTodos;
            this.categories = [...new Set(this.todos.map(todo => todo.category || '').filter(Boolean))];
            this.getTodoByCategory();
          });
        }
      });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }

  getTodoByCategory() {
    if (this.categoryFilter) {
      // this.todoService.getTodoByCategory(this.categoryFilter);
      this.todoService
        .getTodoByCategoryAndUser(this.categoryFilter, this.selectedUser?.id)
        .subscribe(filteredTodos => {
        this.filteredTodos = filteredTodos;
      });
    } else {
      if (this.filter === 'todo') {
        this.filteredTodos = this.todos.filter(todo => !todo.done);
      } else if (this.filter === 'done') {
        this.filteredTodos = this.todos.filter(todo => todo.done);
      } else {
        this.filteredTodos = this.todos;
      }
    }
  }

  openTaskForm() {
    this.formTitle = 'Créer une nouvelle tâche';
    this.formButton = 'Créer';
    this.selectedTodo = null;
  }

  editTask(todo: Todo) {
    this.formTitle = 'Modifier';
    this.formButton = 'Enregistrer';
    this.selectedTodo = { ...todo };
  }
}
