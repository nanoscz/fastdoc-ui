import {NotificationType} from './NotificationType';
import {MatSnackBarConfig} from '@angular/material/snack-bar';

export interface NotificationConfig extends MatSnackBarConfig {
    message: string;
    type?: NotificationType;
    action?: string;
}
