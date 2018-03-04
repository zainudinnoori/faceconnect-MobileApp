import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
/*
  Generated class for the FollowingUsersPostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FollowingUsersPostProvider {
  serverUrl='http://127.0.0.1:8000/api/';

  
  constructor(public http: HttpClient) {
    console.log('Hello FollowingUsersPostProvider Provider');
  }


  posts() : Observable<any> {
    return this.http.get(this.serverUrl + 'user/'+ 59 +'/followings/post')
    .catch(err => {
      console.log('error in following-users-posts service: ', err)
      let error = 'Error'
      return Observable.throw(error);
    });
  }
}
