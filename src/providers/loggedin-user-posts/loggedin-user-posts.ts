import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the LoggedinUserPostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoggedinUserPostsProvider {
  serverUrl='http://127.0.0.1:8000/api/';

  constructor(public http: HttpClient) {
    console.log('Hello LoggedinUserPostsProvider Provider');
  }
  
    posts() : void{

    }
}


