import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [NotificationComponent],
  providers: [NotificationService],
  imports: [CommonModule, MatButtonModule, MaterialModule]
})
export class NotificationModule {}
