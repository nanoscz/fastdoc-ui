import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '../guards/session.guard';
import { ShellPageComponent } from './shell-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShellPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then((m) => m.OrdersModule),
        canActivate : [SessionGuard],
      },
      {
        path: 'clients',
        loadChildren: () => import('../clients/clients.module').then((m) => m.ClientsModule),
        canActivate : [SessionGuard],
      },
      {
        path: 'motorcyclists',
        loadChildren: () => import('../motorcyclists/motorcyclists.module').then((m) => m.MotorcyclistsModule),
        canActivate : [SessionGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
