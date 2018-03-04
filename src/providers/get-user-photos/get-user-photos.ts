import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the GetUserPhotosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetUserPhotosProvider {
  constructor(public http: HttpClient) {
    console.log('Hello GetUserPhotosProvider Provider');
  }

  getPhotos(userId) : Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/users/'+ userId +'/photos')
    .catch(err=>{
      let error ='error'
      return Observable.throw(error);
    })
  }

}
