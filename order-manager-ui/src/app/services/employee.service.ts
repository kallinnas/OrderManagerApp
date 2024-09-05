import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { EmployeeDtoGetDdl } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private baseUrl: string = environment.baseURL + `/Employees`;
  private employeeSubject = new BehaviorSubject<EmployeeDtoGetDdl[]>([]);

  employeesDdl$ = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  getEmployeeById(id: number): EmployeeDtoGetDdl | undefined {
    return this.employeeSubject.value.find(e => e.id === id);
  }

  private loadEmployees() {
    this.http.get<EmployeeDtoGetDdl[]>(`${this.baseUrl}/Ddl`).subscribe({
      next: (employeesDdl: any) => this.employeeSubject.next(employeesDdl),
      error: (error) => console.error('Failed to load employee ddl options:', error)
    });
  }

}
