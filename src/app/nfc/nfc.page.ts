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


  constructor(public navCtrl: NavController, private nfc: NFC, private ndef: Ndef) {
    this.resetScanData();
  }

  resetScanData() {
    this.granted = false;
    this.scanned = false;
    this.tagId = "";
  }

  ionViewDidEnter() {
    this.nfc.enabled().then((resolve) => {
      this.addListenNFC();
    }).catch((reject) => {
      alert("NFC is not supported by your Device");
    });
  }

  addListenNFC() {

    this.nfc.addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
      if (data && data.tag && data.tag.id) {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        
        /*let datatag = data.tag.ndefMessage[0].payload;
        this.datatag = datatag;*/

        this.tagId = tagId;
        this.scanned = true;
          /*only testing data consider to ask web api for access
          this.granted = [
            "7d3c6179"
          ].indexOf(tagId) != -1;
          */

        } else {
          alert('NFC_NOT_DETECTED');
        }
    });
}

  sesReadNFC(data): void {

  }

  failNFC(err) {
    alert("Error while reading: Please Retry");
  }

}