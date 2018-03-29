import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operator/retry';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../../models/comment'



@Injectable()
export class PostLikesCommentsProvider {

serverUrl = 'http://127.0.0.1:8000/api/post/';

  constructor(public http: HttpClient) {
    console.log('Hello PostLikesCommentsProvider Provider');
    
  }
  


  getLikes(pid:number) : Observable<any>
  {
      console.log('post id' , pid); 
      return this.http.get(this.serverUrl + pid + '/likes')
      .catch(err => {
        console.log('err in getlikes service' , err);
               
        let error = 'Error'
        return Observable.throw(error)
      });
  }

  getComments(pid:number) : Observable<any>
  {
      return this.http.get(this.serverUrl + pid + '/comments')
      .catch(err => {
        console.log('err in getComments service' , err);
        let error = 'Error'
        return Observable.throw(error)
      });
  }

}
