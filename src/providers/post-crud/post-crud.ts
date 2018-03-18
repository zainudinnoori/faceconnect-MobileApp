import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
 /*
  Generated class for the PostCrudProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostCrudProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PostCrudProvider Provider');
  }
  deletePost(postId,userId) : Observable<any>
  {
    let url='http://127.0.0.1:8000/api/post/'+ postId +'/'+ userId +'/delete';
    return this.http.get(url)
      .catch(err => {
        console.log('err in get post delete service' , err);
        let error = 'Error'
        return Observable.throw(error)
      });
  }
  
}
