import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

/*
  Generated class for the SignupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignupProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SignupProvider Provider');
  }
  serverUrl='http://127.0.0.1:8000';

  signUp (email: string, password: string ,name:string , dob:string): Observable<any> {
    let url = this.serverUrl + "/api/register";
    return this.http
      .post(
        url,
        { email: email, password: password , name:name ,dob:dob},
      )
      .catch(err => {
        console.log('err in service: ', err)
        let error = 'Error'
        return Observable.throw(error);
      });
  }
  
}
