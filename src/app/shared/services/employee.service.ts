import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
type Employee = any;
type EmployeeDTO = any;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(`${environment.endpoints}/employee`);
  }

  getOne(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${environment.endpoints}/employee/${id}`);
  }

  getOneByUserId(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${environment.endpoints}/employee/user/${id}`);
  }

  create(data: EmployeeDTO): Observable<Employee> {
    return this.http.post<Employee>(`${environment.endpoints}/employee`, data);
  }

  update(id: number, data: Partial<EmployeeDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/employee/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/employee/${id}`);
  }
}
