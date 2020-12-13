import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { getLocaleDateTimeFormat } from '@angular/common';
import { StudentService } from '../services/student.service';
import { Photo, Position } from '../models/photo';

declare var google: any;
declare var require: any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'reto.page.html',
  styleUrls: ['reto.page.scss']
})
export class Tab3Page {
  hidden : boolean = false;
  lat;
  lng;
  map: any;
  imgURL;
  urlInCloudinary: string;
  urlImg;
  location;
  photos: Photo[];

  constructor(
    private geo: Geolocation,
    private actionSheetCrtl: ActionSheetController,
    private camera: Camera,
    private photoService: PhotoService,
    private studentService: StudentService,
  ) {
  this.imgURL='';
  this.urlImg='hola';
  this.photos = [];
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getPhotos(currentUser.username);
  }
  /*
  ionViewDidEnter(){
    this.geo.getCurrentPosition().then((res) =>{
      this.map = new google.maps.Map(document.getElementById("map"),{
        center: { lat: res.coords.latitude, lng: res.coords.longitude},
        zoom: 16,
      });

      var marker = new google.maps.Marker({
        position:{
          lat: res.coords.latitude, lng: res.coords.longitude
        }, 
        map: this.map
      });
    }).catch(e => {
      console.log(e);
    })

  }ç
  */

  hide(){
    this.hidden = true;
  }

  //getCurrentPositon llama al plugin de GPS del movil
  //watchPosition user movement?
  whereIam(){
    
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then( (res) => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
    }).catch((e)=>{
      console.log(e);
    });
  }

  //cordova plugin add cordova-plugin-camera
  //npm install @ionic-native/camera
  getCamera(){
    this.whereIam();
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }).then( (res)=> {
      this.imgURL = 'data:image/jpeg;base64,' + res;
      this.urlImg='res';
    }).catch(e => {
      console.log(e);
    })
  }

  getGallery(){
    this.whereIam();
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then( (res)=> {
      this.imgURL = 'data:image/jpeg;base64,' + res;
      
    }).catch(e => {
      console.log(e);
    })
  }

  async showActionSheet(){

    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then( (res) => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
    }).catch((e)=>{
      console.log(e);
    });

    this.actionSheetCrtl.create({
      header: 'Seleccionar foto para el Reto',
      buttons: [
        {
          text: "Escoger de la galeria",
          icon: 'images-outline',
          handler: () => {
            this.hidden = true;
            this.getGallery()
          }
        },{
          text: "Abrir la Cámara",
          icon: 'camera',
          handler: () => {
            this.hidden = true;
            this.getCamera()
          }
        },{
          text: "Cancelar",
          icon: 'close-outline',
          role: "cancel",
        }        
      ]

    }).then( res => res.present());

  } //ShowActionSheet

  uploadPhoto() {
    //this.whereIam();
    this.hidden = false;
    let idUser = JSON.parse(localStorage.getItem('idUser'));
    let data = {
      // "file": photo,
      "file": this.imgURL,
      "upload_preset": "yd4h1qkj",
      "public_id": this.lat+'-'+idUser.idUser+ "-"+Date.now()
    };
   
    this.photoService.postToCloudinary(data)
      .subscribe(
        data => {
          console.log(data);
          this.urlInCloudinary = data.url; 
          this.postPhoto();
        },
        error => {console.log(error)}
      );

      this.photoService.getLocation(this.lng,this.lat)
      .subscribe(
        data => {

          //this.location = data.address.city_district+'-'+data.address.neighbourhood+'-'+data.address.city+'-'+data.address.postcode+','+data.address.country; 
          this.location = data.address.city_district+'-'+data.address.city+'-'+data.address.postcode+','+data.address.country; 
          alert(this.location)// this.postPhoto();
        },
        error => {console.log(error)}
      );

  }

  postPhoto() {
    // this.whereIam()
    let idUser = JSON.parse(localStorage.getItem('idUser'));
    // console.log(idUser.idUser);
    let a = 3;
    let data = {
      "photoPath": this.urlInCloudinary,
      "latitude": this.lat,
      "longitude": this.lng,
      "location": this.location,
      "student": idUser.idUser
    }



    this.photoService.postToAPI(data)
      .subscribe(
        data => {alert(idUser.user);console.log(data)},
        error => {console.log(error)}
      );
  }

  getPhotos(username) { 
    this.studentService.getByUsername(username)
      .subscribe(
        data => {
          console.log(data);
          // let photosNumber = Object.keys(data[0].photos).length;
          for (let photo of data[0].photos) {
            let photo_aux: Photo = {
              id: photo.id,
              title: photo.location,
              photoPath: photo.photoPath,
              student: photo.student,
              position: {
                lat: photo.latitude,
                lng: photo.longitude,
              }
            }
            this.photos.push(photo_aux);
          }
          // console.log(this.photos);
        },
        error => {
          console.log(error);
        }
      );
  }

} //Fin Class Tab3page
