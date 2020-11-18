import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../student/student'; 
import { StudentService } from '../student/student.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  student : Student = null;
  username : any = null;
  password : any = null;
  token : any = null;
  loginFailed: boolean = false;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  login(): void {
    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.studentService.login(credentials)
      .subscribe(
        data => {
          localStorage.setItem('currentUser', JSON.stringify({ token: data.token, username: credentials.username}));
          // console.log(data);
          this.router.navigate(['/tabs/tab1']);
        },
        error => {
          // console.log(error);
          this.loginFailed = true;
          this.username = null;
          this.password = null;
        }
      );
  }
}
