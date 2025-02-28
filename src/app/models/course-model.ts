import { ICourse } from "../interfaces/icourse";

export class CourseModel implements ICourse {
  department_id!: number;
  course_name!: string;
  course_code!: string;
  course_id!:number;
  department_name!:string;
}
