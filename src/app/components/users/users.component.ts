import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  public userService: UserService;
  public todoService: TodoService;
  
  constructor( userService: UserService, todoService: TodoService ) { 
    this.userService = userService;
    this.todoService = todoService;
  }
  
  // ngOnInit() {
  //   this.userService
  //   .getUsers()
  //   .subscribe(users => {
  //     this.users = users;
  //   });
  // }

  ngOnInit() {
    this.userService
    .getUsers()
    .pipe(take(1)) // évite une souscription multiple
    .subscribe(users => {
      this.users = users;
      this.selectedUser = users[0];
    });
  }

  selectUser(user: User) {
    this.userService.selectUser(user);
    //this.selectedUser = user;
    //this.getTodoForSelectedUser();

    // this.userService.userTodos$.subscribe(todos => {
    //   this.todoService.filterTodos(todos);
    //});
  }

  onSelectUser() {
    //this.todoService.getTodoByUser(this.selectedUser?.id);
    if (this.selectedUser) {
      this.selectUser(this.selectedUser);
    }
  }

  // getTodoForSelectedUser() {
  //   const selectedUserId = this.selectedUser?.id;
  //   if (selectedUserId) {
  //     this.userService
  //       .getTodoForUser(selectedUserId)
  //       .subscribe(todos => {
  //         this.todos = todos;
  //         this.filteredTodos = todos;
  //       });
  //   }
  // }
}
