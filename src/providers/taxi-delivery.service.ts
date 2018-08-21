
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class TaxiDeliveryService {

  constructor(private http: HttpClient) { }

  private url:string='http://127.0.0.1:8000/';
  postData(recurso: any, sendData: any, token?:string): Observable<any> {
    let headers = new HttpHeaders().set('Authorization','Token'+' '+token);

    return this.http.post<any>(this.url+recurso, sendData,{headers:headers});
  }

  postDataRegister(recurso: any, sendData: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post<any>(this.url+recurso, sendData,{headers:headers});
  }

  postPdf(recurso: string, sendData: any): Observable<Blob> {
    return this.http
      .post(recurso, sendData, {
        responseType: 'blob',
      });
  }
  putData(recurso: any, id: string, sendData: any, token?:string): Observable<any> {
    let headers = new HttpHeaders().set('Authorization','Token'+' '+token);
    return this.http.put<any>(this.url+recurso + id, sendData, {headers:headers})
  }

  deleteData(recurso: string, id: string): Observable<any> {
    return this.http.delete<any>(this.url+recurso + id)
  }


  getDataById(recurso: string, id: string): Observable<any> {
    return this.http.get<any>(this.url+recurso + id);
  }

  getData(recurso: string): Observable<any> {
    return this.http.get<any>(this.url+recurso)
  }

}
