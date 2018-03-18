import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the StoreCommentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreCommentProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StoreCommentProvider Provider');
  }
  storeComment(postId ,commentBody , userId){
    let url= "http://127.0.0.1:8000/api/post/"+ postId +"/comment/store"
    return this.http.post(url,
    {
      userId: userId,
      comment_body : commentBody
    }
    ).catch(err=>{
      console.log('err in comment store service: ', err)
      let error = 'Cant store like'
      return Observable.throw(error);
    })

  }
}
