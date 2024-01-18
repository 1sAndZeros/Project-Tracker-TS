export enum ProjectStatus {
  Active,
  Finished,
}

export default class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.people = people;
  }
}
