import { Abstract } from "./abstract";

export class Task extends Abstract {
  name: string;
  description: string;
  realized: boolean;
  priorities?: string;
  createdAt?: Date;

  constructor() {
    super();
    this.name = '';
    this.description = '';
    this.realized = false
  }
}
