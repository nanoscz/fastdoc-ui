import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersPageComponent } from './orders-page.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { NewComponent } from './components/new/new.component';
import { ListComponent } from './components/list/list.component';
@NgModule({
  declarations: [
    OrdersPageComponent,
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ]
})
export class OrdersModule { }
