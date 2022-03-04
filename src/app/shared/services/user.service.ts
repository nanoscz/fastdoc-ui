import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
type User = any;
type UserDTO = any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${environment.endpoints}/user`);
  }

  getOne(id: number): Observable<User> {
    return this.http.get<User>(`${environment.endpoints}/user/${id}`);
  }

  create(data: UserDTO): Observable<User> {
    return this.http.post<User>(`${environment.endpoints}/user`, data);
  }

  update(id: number, data: Partial<UserDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/user/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/user/${id}`);
  }
}
