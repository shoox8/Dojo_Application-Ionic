import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { getLocaleDateTimeFormat } from '@angular/common';
declare var google: any;
declare var require: any
@Component({
  selector: 'app-tab3',
  templateUrl: 'reto.page.html',
  styleUrls: ['reto.page.scss']
})
export class Tab3Page {
  
  lat;
  lng;
  map: any;
  imgURL;
  urlInCloudinary: string;
  urlImg;
  location;

  constructor(
    private geo: Geolocation,
    private actionSheetCrtl: ActionSheetController,
    private camera: Camera,
    private photoService: PhotoService,
  ) {
  this.imgURL='';
  this.urlImg='hola';

  }

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
    this.actionSheetCrtl.create({
      header: 'Seleccionar foto para el Reto',
      buttons: [
        {
          text: "Escoger de la galeria",
          icon: 'images-outline',
          handler: () => {
            this.getGallery()
          }
        },{
          text: "Abrir la Cámara",
          icon: 'camera',
          handler: () => {
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

    // let photo='data:image/jpeg;base64,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'
    

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
          // this.postPhoto();
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
        data => {console.log(data)},
        error => {console.log(error)}
      );
  }

} //Fin Class Tab3page
