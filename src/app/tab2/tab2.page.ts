import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private actionSheetCrtl: ActionSheetController
  ) {}
  
  async showActionSheet(){
    this.actionSheetCrtl.create({
      header: 'Upload Photo',
      buttons: [
        {
          text: "Take photo from Gallery",
          handler: () => {
            console.log("Gallery Clicked")
          }
        },{
          text: "Take Photo on Camera",
          icon: 'camera',
          handler: () => {
            console.log("Camera Clicked")
          }
        },{
          text: "Cancel",
          role: "cancel",

        }
        
      ]

    }).then( res => res.present());
  }
}
