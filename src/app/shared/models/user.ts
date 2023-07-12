import { Abstract } from "./abstract";

export class User extends Abstract {
    firstname: string;
    lastname: string;
    profilImage: string;
    birthday: Date;
    email: string;
    username: string;
    password: string;

  constructor() {
    super();
    this.firstname = '';
    this.lastname = '';
    this.birthday = new Date();
    this.email = '';
    this.username = '';
    this.password = '';
    this.profilImage = '';
  }
}
