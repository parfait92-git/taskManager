export class Abstract {
  id?: string;
  created?: Date;
  loadFromJSON(jsonElement: any) {
    Object.assign(this, jsonElement);
  }
}
