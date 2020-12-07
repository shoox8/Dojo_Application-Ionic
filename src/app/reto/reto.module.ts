import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './reto.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Camera } from '@ionic-native/camera/ngx';

import { Tab3PageRoutingModule } from './reto-routing.module';
import { AppComponent } from '../app.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [Tab3Page],
  providers: [Camera],
  bootstrap: [AppComponent],
})
export class Tab3PageModule {}