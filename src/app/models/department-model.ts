import { Idepartment } from '../interfaces/idepartment';
export class DepartmentModel implements Idepartment {
  department_id!: number;
  department_name!: string;
}
