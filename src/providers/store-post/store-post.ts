import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the StorePostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorePostProvider {
  constructor(public http: HttpClient) {

  }

  submitPost(body,AuthId): Observable<any>{
    let url = "http://127.0.0.1:8000/api/post/store";
    console.log('you are in store post provider '+ body);
    return this.http
      .post(
        url,
        { body: body,
          userId: AuthId
        },
      )
      .catch(err => {
        console.log('err in service: ', err)
        let error = 'Invalid credentials'
        return Observable.throw(error);
      });
  }
}
