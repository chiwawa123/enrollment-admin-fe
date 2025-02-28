import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Idepartment } from '../../interfaces/idepartment';
import { IStudent } from '../../interfaces/istudent';
import { ICourse } from '../../interfaces/icourse';
import { StudentModel } from '../../models/student-model';
import { CourseModel } from '../../models/course-model';
import { StudentCourseModel } from '../../models/student-course-model';
import { DepartmentModel } from '../../models/department-model';
import { ToastrService } from 'ngx-toastr';
import { DataResponse } from '../../interfaces/data-response';
import { IStudentCourse } from '../../interfaces/istudent-course';



@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  departments: Idepartment[] = [];
  students: IStudent[] = [];
  courses: ICourse[] = [];

  departmentModel = new DepartmentModel();
  studentModel = new StudentModel();
  courseModel = new CourseModel();
  studentCourseModel = new StudentCourseModel();

  constructor(private dataService: DataService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getDepartments();
    this.getStudents();
    this.getCourses();
  }

  getDepartments(){
    this.dataService.getDepartments().subscribe(res=>{
      this.departments = res;
      console.log(this.departments);
    });
  }

  addDepartment() {
    this.dataService.addDepartment(this.departmentModel).subscribe((res: DataResponse<Idepartment>) => {
      console.log('Department added:', res);

      // Show success message
      this.toastr.success(res.message);

      // Add the new department to the list
      this.departments.push(res.data);

      // Refresh department list
      this.getDepartments();
    });
  }



  deleteDepartment(departmentId: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.dataService.deleteDepartment(departmentId).subscribe(
        () => {
          console.log('Department deleted successfully');
          this.getDepartments(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting department:', error);
        }
      );
    }
  }


  /////////////////////////////////////////////////////////////////// students ////////////////////////////////////////////////////////////////////////////

  getStudents(){
    this.dataService.getStudents().subscribe((res)=>{
      this.students = res;
      console.log(this.students);
    });
  }

  addStudent(){
    this.dataService.addStudent(this.studentModel).subscribe((res:DataResponse<IStudent>)=> {
      console.log('student added:', res);

        this.toastr.success(res.message);

      this.students.push(res.data);
      this.getStudents();
    });
  }

  deleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.dataService.deleteStudent(studentId).subscribe(
        () => {
          console.log('student deleted successfully');
          this.getStudents(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }



  /////////////////////////////////////////////////////////////////// Courses ////////////////////////////////////////////////////////////////////////////

  getCourses(){
    this.dataService.getCourses().subscribe(res=>{
      this.courses = res;
      console.log(this.courses);
    });
  }

  addCourse(){
    this.dataService.addCourse(this.courseModel).subscribe((res:DataResponse<ICourse>)=> {
      this.toastr.success(res.message);
      console.log('course added:', res);
      this.courses.push(res.data);
      this.getCourses();
    });
  }

  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.dataService.deleteCourse(courseId).subscribe(
        () => {
          console.log('course deleted successfully');
          this.getCourses(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting course:', error);
        }
      );
    }
  }

    /////////////////////////////////////////////////////////////////// AssignCourses ////////////////////////////////////////////////////////////////////////////


    assignCourse() {
      this.dataService.assignCourse(this.studentCourseModel).subscribe({
        next: (res: DataResponse<IStudentCourse>) => {
          console.log('Course assigned:', res);
          this.toastr.success(res.message); // Success message
        },
        error: (err) => {
          console.error('Error:', err);
          this.toastr.error(err.error.message || 'An error occurred while assigning courses.');
        }
      });
    }


}
