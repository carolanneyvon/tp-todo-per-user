import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Input() todo: Todo = {};
  @Input() formTitle = '';
  @Input() formButton = '';
  text?: string;
  category?: string;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    if (this.todo) {
      this.text = this.todo.text;
      this.category = this.todo.category;
    }
  }

  onSubmit() {
    if (this.todo) {
      const updatedTodo = { ...this.todo, text: this.text, category: this.category };
      this.todoService.updateTodo(updatedTodo);
    } else {
      const newTodo: Todo = {
        id_user: this.todoService.todos$.value[0].id_user,
        text: this.text,
        category: this.category,
        done: false
      };
      this.todoService.createTodo(newTodo);
    }
    this.todoService.todos$.subscribe(() => {
      this.delete();
    });
  }

  delete() {
    if (this.todo) {
      this.todoService.deleteTodo(this.todo.id);
    }
    this.delete();
  }
}
