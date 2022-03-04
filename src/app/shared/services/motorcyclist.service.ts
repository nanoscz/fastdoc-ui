import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
type Motorcyclist = any;
type MotorcyclistDTO = any;

@Injectable({
  providedIn: 'root'
})
export class MotorcyclistService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Motorcyclist>> {
    return this.http.get<Array<Motorcyclist>>(`${environment.endpoints}/motorcyclist`);
  }

  getOne(id: number): Observable<Motorcyclist> {
    return this.http.get<Motorcyclist>(`${environment.endpoints}/motorcyclist/${id}`);
  }

  getOneByUserId(id: number): Observable<Motorcyclist> {
    return this.http.get<Motorcyclist>(`${environment.endpoints}/motorcyclist/user/${id}`);
  }

  create(data: MotorcyclistDTO): Observable<Motorcyclist> {
    return this.http.post<Motorcyclist>(`${environment.endpoints}/motorcyclist`, data);
  }

  update(id: number, data: Partial<MotorcyclistDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/motorcyclist/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/motorcyclist/${id}`);
  }
}
