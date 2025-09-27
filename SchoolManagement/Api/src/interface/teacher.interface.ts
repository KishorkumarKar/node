export interface ITeacher {
  id?: string;
  name: string;
  teacher_id: string;
  school_id: string;
  gender: string;
  subjects: Array<string>;
  email: string;
  phone: string;
  password: string;
  joining_date: Date;
  class?: Array<string>;
}

export interface ITeacherLogin {
  email: string;
  password: string;
}

export interface ITeacherForgotPassword {
  email: string;
}
