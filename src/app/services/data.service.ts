import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerDetails } from '../configs/server-details';
import { Observable } from 'rxjs';
import { Idepartment } from '../interfaces/idepartment';
import { ICourse } from '../interfaces/icourse';
import { IStudent } from '../interfaces/istudent';
import { IStudentCourse } from '../interfaces/istudent-course';
import { DataResponse } from '../interfaces/data-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  ////////////////////////////////////////////////////////////// Departments //////////////////////////////////////////////////////////////////////////

  getDepartments(): Observable<Idepartment[]> {
    return this.http.get<Idepartment[]>(`${ServerDetails.serverIP}departments`);
  }

  addDepartment(department: Idepartment): Observable<DataResponse<Idepartment>> {
    return this.http.post<DataResponse<Idepartment>>(`${ServerDetails.serverIP}addDepartment`, department);
  }

  deleteDepartment(departmentId: number): Observable<any> {
    return this.http.delete(`${ServerDetails.serverIP}deleteDepartment/${departmentId}`);
  }

  updateDepartment(departmentId: number, department: Idepartment): Observable<Idepartment> {
    const url = `${ServerDetails.serverIP}/updateDepartment/${departmentId}`;
    return this.http.put<Idepartment>(url, department);
  }


  ///////////////////////////////////////////////////////////////////////// Courses /////////////////////////////////////////////////////////////////////

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${ServerDetails.serverIP}courses`);
  }

  addCourse(course: ICourse): Observable<DataResponse<ICourse>> {
    return this.http.post<DataResponse<ICourse>>(`${ServerDetails.serverIP}addCourse`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${ServerDetails.serverIP}deleteCourse/${courseId}`);
  }

  updateCourse(courseId: number, course: ICourse): Observable<ICourse> {
    const url = `${ServerDetails.serverIP}/updateCourse/${courseId}`;
    return this.http.put<ICourse>(url, course);
  }

    ///////////////////////////////////////////////////////////////////////// Students /////////////////////////////////////////////////////////////////////

    getStudents(): Observable<IStudent[]> {
      return this.http.get<IStudent[]>(`${ServerDetails.serverIP}students`);
    }

    addStudent(student: IStudent): Observable<DataResponse<IStudent>> {
      return this.http.post<DataResponse<IStudent>>(`${ServerDetails.serverIP}addStudent`, student);
    }

    deleteStudent(studentId: number): Observable<any> {
      return this.http.delete(`${ServerDetails.serverIP}deleteStudent/${studentId}`);
    }

    updateStudent(studentId: number, student: IStudent): Observable<IStudent> {
      const url = `${ServerDetails.serverIP}/updateStudent/${studentId}`;
      return this.http.put<IStudent>(url, student);
    }


    ///////////////////////////////////////////////////////////////////// AssignCourse /////////////////////////////////////////////////////////////////////////

    assignCourse(studentCourse: IStudentCourse): Observable<DataResponse<IStudentCourse>> {
      return this.http.post<DataResponse<IStudentCourse>>(`${ServerDetails.serverIP}assignCourse`, studentCourse);
    }

}
