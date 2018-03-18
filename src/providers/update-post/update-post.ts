import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the UpdatePostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UpdatePostProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UpdatePostProvider Provider');
  }

  update(userId , postId , content) : Observable<any>{
    let url= 'http://127.0.0.1:8000/api/post/' + postId + '/' + userId + '/update';
    console.log(content +'in service')
    return this.http.post(url,
      {
        postBody : content
      }
    ).catch(err=>{
      let error = "error in edit post service";
      return Observable.throw(err);
    })
  }

}
