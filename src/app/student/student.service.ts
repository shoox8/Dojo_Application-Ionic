import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'https://apirestcharliev1.herokuapp.com/';

  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(this.apiUrl+'login/', credentials);
  }

  get(id): Observable<any> {
    return this.http.get(this.apiUrl+'api/users/'+id);
  }

  getByUsername(username): Observable<any> {
    return this.http.get(this.apiUrl+'api/users/'+username);
  }

  update(id, data): Observable<any> {
    return this.http.put(this.apiUrl+'api/users/'+id, data);
  }

}
