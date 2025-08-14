export interface ITeacher {
  id?: number;
  name: string;
  email: string;
  password: string;
  class?: Array<string>;
}

export interface ITeacherLogin {
  email: string;
  password: string;
}
