import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotorcyclistsRoutingModule } from './motorcyclists-routing.module';
import { MotorcyclistsPageComponent } from './motorcyclists-page.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from './components/new/new.component';
import { ListComponent } from './components/list/list.component';
import { MaterialModule } from '../material/material.module';
import { NotificationModule } from '../notification/notification.module';


@NgModule({
  declarations: [
    MotorcyclistsPageComponent,
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MotorcyclistsRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationModule
  ]
})
export class MotorcyclistsModule { }
