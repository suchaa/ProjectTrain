import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
/* providers */
export class CompanyService {

  options: RequestOptions;

  constructor(private http : Http) {
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      });
      this.options = new RequestOptions({ headers: headers });
  }

  loadItem(): Observable<any[]> {
    /* ทำงานแบบไม่รอกัน เลยเกิดมี return 2 ที่ */
    /* **1** environment.apiUrl +'/company' */
    return this.http.get(`${environment.apiUrl}/company`, this.options) /* **2** นิยมกว่า*/
      .map((res: Response) => {
        /* retrun ค่าออกไป */
        return res.json() /* subscribe รอรับผลจากตรงนี้ */
      })
      .catch((error: any) => Observable.throw(error));
  }

  loadItemById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/findById/${id}`, this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  /* post ต้องมี body
     addItem รับตัวแปร body*/
  addItem(body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload

    return this.http.post(`${environment.apiUrl}/company`, bodyString, this.options) // ...using post request
      .map((res: Response) => {
        return res.json() // ...and calling .json() on the response to return data
      })
      .catch((error: any) => Observable.throw(error)); //...errors if any 
  }

  deleteItem(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/company/${id}`, this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  updateItem(id, body): Observable<any> {
    let bodyString = JSON.stringify(body);


    return this.http.put(`${environment.apiUrl}/company/${id}`, bodyString, this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  search(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    return this.http.post(`${environment.apiUrl}/company/search`, bodyString, this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

}
