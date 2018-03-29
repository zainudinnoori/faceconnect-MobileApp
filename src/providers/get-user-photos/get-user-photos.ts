import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class GetUserPhotosProvider {
  constructor(public http: HttpClient) {
    console.log('Hello GetUserPhotosProvider Provider');
  }

  getPhotos(userId) : Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/user/'+ userId +'/photos')
    .catch(err=>{
      let error ='error'
      return Observable.throw(error);
    })
  }

}
