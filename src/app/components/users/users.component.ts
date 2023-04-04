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
  
  constructor(private userService: UserService, private todoService: TodoService ) { }
  
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
    this.userService
    .selectUser(user);
  }

  onSelectUser() {
    this.todoService.getTodoByUser(this.selectedUser?.id);
  }
}
