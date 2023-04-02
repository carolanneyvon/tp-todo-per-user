import { Todo } from "./todo";

export class User {
  constructor(
    public id?: string,
    public lastname?: string,
    public firstname?: string,
    // public email: string,
    // public password: string,
    // public role: string,
    //public editable = false,
  ) {}
}