import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FollowUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FollowUserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FollowUserProvider Provider');
  }

  follow(authId , userId) :Observable<any>{
    let url = "http://127.0.0.1:8000/api/user/follow";
    return this.http.post(url , {
      authId: authId,
      userId: userId
    })
    .catch( res =>{
      console.log("error in follow service");
      let err = "error in follow service";
      return Observable.throw(err);   
    })
  }
}
