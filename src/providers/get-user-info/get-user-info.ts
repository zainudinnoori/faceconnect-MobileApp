import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Storage } from '@ionic/storage';

/*
  Generated class for the GetUserInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetUserInfoProvider {
  serverUrl: '';
  AuthId;
  constructor(public http: HttpClient , public storage: Storage) {
    console.log('Hello GetUserInfoProvider Provider');
    storage.get('Auth').then((val) => {
      this.AuthId = val.authId
      console.log('Authentication id in get info service'+this.AuthId)
    })

  }

  getInfo(uId)
  {
    console.log('user info id in get info service '+ uId);
    console.log('Authentication id in get info service'+this.AuthId);    
    return this.http.get('http://127.0.0.1:8000/api/user/'+ uId +'/info/'+ this.AuthId)
    .catch(err => {
      console.log('err in get user info  service' , err);
      let error = 'Error'
      return Observable.throw(error)
    });
  }
}
