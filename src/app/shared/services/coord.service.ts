import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
type Coord = any;
type CoordDTO = any;

@Injectable({
  providedIn: 'root'
})
export class CoordService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Coord>> {
    return this.http.get<Array<Coord>>(`${environment.endpoints}/coord`);
  }

  getOne(id: number): Observable<Coord> {
    return this.http.get<Coord>(`${environment.endpoints}/coord/${id}`);
  }

  create(data: CoordDTO): Observable<Coord> {
    return this.http.post<Coord>(`${environment.endpoints}/coord`, data);
  }

  update(id: number, data: Partial<CoordDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/coord/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/coord/${id}`);
  }
}
