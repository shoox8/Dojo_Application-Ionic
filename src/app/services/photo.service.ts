import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

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

  postToCloudinary(data): Observable<any> {
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    };

    return this.http.post('https://api.cloudinary.com/v1_1/hufhdyfam/image/upload', data, httpOptions);
  }

  postToAPI(data): Observable<any> {
    return this.http.post(this.apiUrl+'api_v1/PhotoStudent/', data, this.httpOptions);
  }

}