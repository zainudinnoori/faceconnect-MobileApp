import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the GetNotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetNotificationsProvider {

  constructor(public http: HttpClient ,public getNotificationsService: GetNotificationsProvider) {
    console.log('Hello GetNotificationsProvider Provider');
  }

  notifications(uId):Observable<any>{
    let url = 'http://localhost:8000/api/user/'+ uId +'/notifications';
    return this.http.get(url).catch(err => {
      let error = "error in notification service";
      return Observable.throw(error);
    })
  }

}
