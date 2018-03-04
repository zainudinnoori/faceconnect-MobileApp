import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'

/*
  Generated class for the GetUserInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetUserInfoProvider {
  serverUrl: '';

  constructor(public http: HttpClient) {
    console.log('Hello GetUserInfoProvider Provider');
  }

  getInfo(uId)
  {
    console.log(uId);
    return this.http.get('http://127.0.0.1:8000/api/user/'+ uId +'/info')
    .catch(err => {
      console.log('err in get user info  service' , err);
      let error = 'Error'
      return Observable.throw(error)
    });
  }
}
