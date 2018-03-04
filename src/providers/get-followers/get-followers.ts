import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
 /*
  Generated class for the GetFollowersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetFollowersProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GetFollowersProvider Provider');
  }


  getFollowers(uId) : Observable<any>{
    
    return this.http.get('http://127.0.0.1:8000/api/user/'+ uId +'/followers')
    .catch(err => {
      console.log('err in get-followers service' , err);
      let error = 'Error'
      return Observable.throw(error)
    });
  }

}
