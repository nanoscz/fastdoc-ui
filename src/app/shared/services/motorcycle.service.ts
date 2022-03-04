import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
type Motorcyclist = any;
type MotorcyclistDTO = any;

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Motorcyclist>> {
    return this.http.get<Array<Motorcyclist>>(`${environment.endpoints}/motorcycle`);
  }

  getOne(id: number): Observable<Motorcyclist> {
    return this.http.get<Motorcyclist>(`${environment.endpoints}/motorcycle/${id}`);
  }

  create(data: MotorcyclistDTO): Observable<Motorcyclist> {
    return this.http.post<Motorcyclist>(`${environment.endpoints}/motorcycle`, data);
  }

  update(id: number, data: Partial<MotorcyclistDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/motorcycle/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/motorcycle/${id}`);
  }
}
