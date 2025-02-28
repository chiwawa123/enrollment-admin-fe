import { IStudent } from "../interfaces/istudent";

export class StudentModel implements IStudent {
  first_name!: string;
  last_name!: string;
  email!: string;
  phone_number!: number;
  student_id!:number;
}
