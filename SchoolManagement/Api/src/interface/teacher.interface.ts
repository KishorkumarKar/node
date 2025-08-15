export interface ITeacher {
  id?: string;
  name: string;
  email: string;
  password: string;
  class?: Array<string>;
}

export interface ITeacherLogin {
  email: string;
  password: string;
}
