import { IStudentCourse } from "../interfaces/istudent-course";

export class StudentCourseModel implements IStudentCourse {
  student_id!: number;
  course_id!: number;
  course_ids: number[] = [];
}
