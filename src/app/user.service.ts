import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  constructor(private http : Http) { }

  loadItem(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/user`) 
      .map((res: Response) => {
        /* retrun ค่าออกไป */
        return res.json() /* subscribe รอรับผลจากตรงนี้ */
      })
      .catch((error: any) => Observable.throw(error));
  }

  loadItemById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/findById/${id}`)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  addItem(body): Observable<any> {
    let bodyString = JSON.stringify(body); 
    let headers = new Headers({ 'Content-Type': 'application/json' }); 
    let options = new RequestOptions({ headers: headers }); 

    return this.http.post(`${environment.apiUrl}/user`, body, options) 
      .map((res: Response) => {
        return res.json() 
      })
      .catch((error: any) => Observable.throw(error)); 
  }

  deleteItem(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/user/${id}`)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  updateItem(id, body): Observable<any> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.apiUrl}/user/${id}`, body, options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  search(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.apiUrl}/user/search`, bodyString, options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

}
