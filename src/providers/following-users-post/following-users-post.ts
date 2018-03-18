import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { PostCollection } from '../../models/postscollection'



@Injectable()
export class FollowingUsersPostProvider {
  serverUrl='http://127.0.0.1:8000/api/';

  
  constructor(public http: HttpClient) {
    // console.log('Hello FollowingUsersPostProvider Provider');
  }


  posts(userId) : Observable<PostCollection> {
    // console.log('we return a post object');
    return this.http.get(this.serverUrl + 'user/'+ userId +'/followings/post')
    .catch(err => {
      console.log('error in following-users-posts service: ', err)
      let error = 'Error'
      return Observable.throw(error);
    });
  }
}
