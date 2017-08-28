import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
/* providers */
export class CompanyService {

  constructor(private http : Http) { }

  loadItem(): Observable<any[]> {
    /* ทำงานแบบไม่รอกัน เลยเกิดมี return 2 ที่ */
    /* **1** environment.apiUrl +'/company' */
    return this.http.get(`${environment.apiUrl}/company`) /* **2** นิยมกว่า*/
      .map((res: Response) => {
        /* retrun ค่าออกไป */
        return res.json() /* subscribe รอรับผลจากตรงนี้ */
      })
      .catch((error: any) => Observable.throw(error));
  }

  loadItemById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/findById/${id}`)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  /* post ต้องมี body
     addItem รับตัวแปร body*/
  addItem(body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(`${environment.apiUrl}/company`, body, options) // ...using post request
      .map((res: Response) => {
        return res.json() // ...and calling .json() on the response to return data
      })
      .catch((error: any) => Observable.throw(error)); //...errors if any 
  }

  deleteItem(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/company/${id}`)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  updateItem(id, body): Observable<any> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.apiUrl}/company/${id}`, body, options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  search(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.apiUrl}/company/search`, bodyString, options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

}
