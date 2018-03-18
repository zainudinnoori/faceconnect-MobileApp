import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the StoreLikeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreLikeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StoreLikeProvider Provider');
  }

  store(postId ,userId): Observable<any>{
    let url = 'http://127.0.0.1:8000/api/post/'+ postId +'/like';
    return this.http.post(
      url,
      {
        userId: userId
      },
    ).catch(err => {
      console.log('err in service: ', err)
      let error = 'Cant store like'
      return Observable.throw(error);
    });
  }

}
