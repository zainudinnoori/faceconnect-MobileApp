import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Http, ResponseOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { SessionStorage } from 'angular-web-storage';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class LoginProvider {
  constructor(public http: HttpClient) {
// 
  }
 

serverUrl='http://127.0.0.1:8000';

  login(email: string, password: string): Observable<any> {
    let url = this.serverUrl + "/api/login";
    return this.http
      .post(
        url,
        { email: email, password: password },
      )
      .catch(err => {
        console.log('err in login service: ', err)
        let error = 'Invalid credentials'
        return Observable.throw(error);
      });
  }

}
