import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { StudentDojoBeltService } from '../services/serviceDojoStudentBelt.service';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-tab4',
  templateUrl: 'gps.page.html',
  styleUrls: ['gps.page.scss']
})
export class Tab4Page {

}