import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
declare var google: any;
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

  constructor(
    private geo: Geolocation,
    private actionSheetCrtl: ActionSheetController,
    private camera: Camera
  ) {

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

    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }).then( (res)=> {
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch(e => {
      console.log(e);
    })

  }

  getGallery(){

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
} //Fin Class Tab3page
