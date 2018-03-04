import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  } from 'rxjs';

/*
  Generated class for the GetUserOwnPostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetUserOwnPostsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GetUserOwnPostsProvider Provider');
  }

  getPosts(userId) : Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/user/'+ userId +'/posts')
    .catch(err =>{
      console.log('error in get-own-user-posts service',err);
      let error = 'Error';
      return Observable.throw(error)
    })
    
  }
}
