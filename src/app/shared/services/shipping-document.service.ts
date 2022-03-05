import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
type ShippingDetail = any;
type ShippingDetailDTO = any;

@Injectable({
  providedIn: 'root'
})
export class ShippingDocumentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<ShippingDetail>> {
    return this.http.get<Array<ShippingDetail>>(`${environment.endpoints}/shipping/document`);
  }

  getOne(id: number): Observable<ShippingDetail> {
    return this.http.get<ShippingDetail>(`${environment.endpoints}/shipping/document/${id}`);
  }

  create(data: ShippingDetailDTO): Observable<ShippingDetail> {
    return this.http.post<ShippingDetail>(`${environment.endpoints}/shipping/document`, data);
  }

  update(id: number, data: Partial<ShippingDetailDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/shipping/document/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/shipping/document/${id}`);
  }
}
