import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'reto.page.html',
  styleUrls: ['reto.page.scss']
})
export class Tab3Page {

  imgURL;
  constructor(
    private camera: Camera

  ) {}
  
  //Camera plugin: https://ionicframework.com/docs/native/camera
  getCamera(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then( (res) => {
      this.imgURL = res;
    }).catch(e => {
      console.log(e);
    })
  }

  getGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL

    }).then( (res) => {
      this.imgURL = 'data:image/jpeg;base64' + res;
    }).catch(e => {
      console.log(e);
    })
  }

}
