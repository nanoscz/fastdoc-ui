import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
type Role = any;


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(`${environment.endpoints}/role`);
  }

  getOne(id: number): Observable<Role> {
    return this.http.get<Role>(`${environment.endpoints}/role/${id}`);
  }
}
