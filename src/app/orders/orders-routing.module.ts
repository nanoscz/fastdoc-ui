import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';
import { OrdersPageComponent } from './orders-page.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'new',
        component: NewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
