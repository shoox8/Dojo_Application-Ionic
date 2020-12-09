import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { NavController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'nfc.page.html',
  styleUrls: ['nfc.page.scss']
})
export class Tab2Page {

  granted: boolean;
  denied: boolean;
  scanned: boolean;
  tagId: string;
  readingTag: boolean = false;
  tag:string;
  fecha:string;


  constructor(public navCtrl: NavController, private nfc: NFC, private ndef: Ndef) {
    this.resetScanData();
  }

  resetScanData() {
    this.granted = false;
    this.scanned = false;
    this.tagId = "";
    this.tag="";
    this.fecha=new Date().toISOString();
  
    
  };

  ionViewDidEnter() {
    this.nfc.enabled().then((resolve) => {
      this.addListenNFC();
    }).catch((reject) => {
      alert("NFC is not supported by your Device");
    });
  }
  // https://github.com/lionlancer/asdfghjkl/blob/master/www/phonegap-nfc-215.js
  addListenNFC() {
    // https://forum.ionicframework.com/t/read-ndef-data-in-a-nfc-tag/86307/11
    // https://stackoverflow.com/questions/36006013/nfc-reader-apache-cordova
    this.nfc.addNdefListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
      if (data && data.tag && data.tag.id) {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        // let tagId = this.nfc.bytesToHexString(data.tag.uriRecord);
        // let tagId = this.nfc.bytesToHexString(data.tag.TextRecord);
        //let tag=JSON.stringify(data.tag);
        // let tag=data.tag.textRecord;
        /*let datatag = data.tag.ndefMessage[0].payload;
        this.datatag = datatag;*/
        let payload = data.tag.ndefMessage[1]["payload"];

        // let payload = "5";
        //let tagContent = this.nfc.bytesToString(payload);
        // https://living-sun.com/es/datetime/230384-locale-time-on-ionic2-datetime-picker-datetime-angular-typescript-ionic2-toisostring.html
        alert(JSON.stringify(payload)+'----'+ this.fecha);

        this.tagId = tagId;
        this.scanned = true;
        // this.tag=JSON.stringify(tag);
        // let payload = data.tag.ndefMessage;
        let tagContent = this.nfc.bytesToString(payload).substring(3);
        /*only testing data consider to ask web api for access
          this.granted = [
            "7d3c6179"
          ].indexOf(tagId) != -1;
          */
         //this.tag=payload;
         this.tag=tagContent;



        } else {
          alert('NFC_NOT_DETECTED');
        }


      
    });

 
}

  sesReadNFC(data): void {

  }

  parseTag(nfcEvent): void {

  }


  failNFC(err) {
    alert("Error while reading: Please Retry");
  }

}