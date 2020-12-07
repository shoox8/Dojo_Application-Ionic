import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceDojoService {

  apiUrl = 'https://apirestcharliev1.herokuapp.com/';
  token: string = '';
  httpOptions = null;

  constructor(private http: HttpClient) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser != null){
      this.token = currentUser.token;
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + this.token
      })
    };
  }

  get(id): Observable<any> {
    return this.http.get(this.apiUrl+'api_v1/serviceDojo/'+id, this.httpOptions);
  }

}
