import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the SharePostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharePostProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SharePostProvider Provider');
  }

  share(postId, userId): Observable<any>{
    let url= 'http://127.0.0.1:8000/api/post/'+ postId +'/share';
    return this.http.post(url,{
      userId: userId,
    }).catch(err =>
      {
        let error = "error in share post service";
        return Observable.throw(error);
      })
  }
}
