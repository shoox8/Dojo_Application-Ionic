import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../home/home.module').then(m => m.Tab1PageModule)
      },
      {

        path: 'tab2',
        loadChildren: () => import('../nfc/nfc.module').then(m => m.Tab2PageModule)
      },
      {

       path: 'tab3',
        loadChildren: () => import('../reto/reto.module').then(m => m.Tab3PageModule)
      },
      {

        path: 'tab4',
         loadChildren: () => import('../gps/gps.module').then(m => m.Tab4PageModule)
       },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
