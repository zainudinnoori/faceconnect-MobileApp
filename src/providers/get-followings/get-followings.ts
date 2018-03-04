import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { retry } from 'rxjs/operators/retry';
/*
  Generated class for the GetFollowingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetFollowingsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GetFollowingsProvider Provider');
  }

  getFollowings(uId:number) :Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/user/'+ uId +'/followings')
    .catch(err=>{
      console.log('err in get-follwings-service');
      let error = 'error';
      return Observable.throw(error);
    })
  }
}
