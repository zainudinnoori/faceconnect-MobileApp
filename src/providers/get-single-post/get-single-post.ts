import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the GetSinglePostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetSinglePostProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GetSinglePostProvider Provider');
  }

  getPost(postId):Observable<any>
  {
    let url='http://127.0.0.1:8000/api/post/'+ postId +'/show';
    return this.http.get(url)
    .catch(err=>
      {
        console.log('err in get-signle post -service');
        let error = 'error';
        return Observable.throw(error);
       });
  }
}

