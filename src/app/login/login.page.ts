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
  token : any = null;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  login(username, password): void {
    const credentials = {
      username: username,
      password: password,
    };

    this.studentService.login(credentials)
      .subscribe(
        data => {
          this.token = data;
          console.log(data);
          this.router.navigate(['']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
