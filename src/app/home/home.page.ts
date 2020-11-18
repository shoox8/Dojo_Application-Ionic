import { Component } from '@angular/core';
import { Student } from '../student/student';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Tab1Page {

  student: Student;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    
  }

}
