export interface ISchool {
  id?: string;
  name: string;
  school_id: string;
  phone: string;
  email: string;
  start_time: string;
  // end_time:string,
  class_duration: number;
  break_time: number;
  break_time_started: number;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}
export interface IMassDelete {
  // ids: string[]; // this is if we can have empty array,
  ids: [string, ...string[]]; // this is minimum one string is required ,
}
