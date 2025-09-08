export interface Period {
  start: string;
  end: string;
  subject: string;
  teacher_id: string;
}

export interface Schedule {
  day: string;
  periods: Period[];
}

export interface Subject {
  name: string;
  teacher_id: string;
}

export interface IClassroomDocument {
  id: string;
  school_id: string;
  class_id: string;
  name: string;
  class_teacher: string;
  number_of_class: number;
  subjects: Subject[];
  students: string[];
  schedule: Schedule[];
}
