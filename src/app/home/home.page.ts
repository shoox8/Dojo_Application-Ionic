import { Component } from '@angular/core';
import { Belt } from '../models/belt';
import { ServiceDojo } from '../models/serviceDojo';
// import { dirname } from 'path';

import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { BeltService } from '../services/belt.service';
import { ServiceDojoService } from '../services/serviceDojo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Tab1Page {

  valor_min: number;
  valor_max: number;
  valor: number;

  student: Student;

  constructor( private studentService: StudentService, 
               private beltService: BeltService, 
               private serviceDojoService: ServiceDojoService) {
    this.student = new Student();
    this.student.belt = new Belt();
    this.student.belt.service = new ServiceDojo();
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser.token; // your token
    this.getStudentData(currentUser.username);
  }

  getStudentData(username) {
    this.studentService.getByUsername(username)
      .subscribe(
        data => {
          console.log(data);
          // console.log("hola "+ data.id);
          localStorage.setItem('idUser', JSON.stringify({ idUser: data[0].id }));
          this.student.id = data[0].id;
          this.student.username = data[0].username; 
          this.student.dni = data[0].dni;
          this.student.dateofBirth = data[0].dateofBirth;
          this.student.username = data[0].username;
          this.student.completeName = data[0].completeName;
          this.student.phone = data[0].phone;
          this.student.points = data[0].points;
          this.student.to_delete = data[0].to_delete;
          this.student.belt.id = data[0].belts[0].belt;
          this.student.belt.attendedClasses = data[0].belts[0].attendedClasses;
          this.student.belt.service.id = data[0].belts[0].studentService[0].serviceDojo;
          console.log(Object.keys(data[0].photos).length);
          console.log(this.student);
          this.getBeltsData();
        },
        error => {
          console.log(error);
        }
      );
  }

  getBeltsData(){
    // console.log(this.student.belt.id);
    this.beltService.get(this.student.belt.id)
      .subscribe(
        data => {
          // console.log(data);
          this.student.belt.colour = data.name;
          this.student.belt.requiredClasses = data.classesRequired;
          this.student.belt.nextBelt = data.nextBelt;
          // console.log(this.student);
          this.getServicesData();
        },
        error => {
          console.log(error);
        }
      );
  }

  getServicesData() {
    this.serviceDojoService.get(this.student.belt.service.id)
      .subscribe(
        data => {
          console.log(data.name);
          this.student.belt.service.name = data.name;
          console.log(this.student);
        },
        error =>{
          console.log(error);
        }
      );
  }

  calcularValor(){
    this.valor = this.valor_min / this.valor_max;
  }

}
