import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsPageComponent } from './clients-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ClientsPageComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ClientsModule { }
