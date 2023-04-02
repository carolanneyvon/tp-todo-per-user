export class Todo {
  constructor(
    public id?: string,
    public text?: string,
    public categorie?: string,
    public done = false,
    public id_user?: string
  ) {}
}
