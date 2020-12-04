import { Component } from '@angular/core';
// import { dirname } from 'path';

import { Student } from '../student/student';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Tab1Page {

  student: Student;

  constructor(private studentService: StudentService) {
    this.student = new Student();
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser.token; // your token
    // console.log(this.token);
    this.studentService.getByUsername(currentUser.username)
      .subscribe(
        data => {
          this.student.username = data[0].username; 
          this.student.dni = data[0].dni;
          this.student.dateofBirth = data[0].dateofBirth;
          this.student.username = data[0].username;
          this.student.first_name = data[0].first_name;
          this.student.last_name = data[0].last_name;
          this.student.phone = data[0].phone;
          this.student.points = data[0].points;
          this.student.to_delete = data[0].to_delete;
          console.log(this.student);
        },
        error => {
          console.log(error);
        }
      );
  }

}
