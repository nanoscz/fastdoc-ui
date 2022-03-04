import {Injectable} from '@angular/core';
import {NotificationConfig} from '../types/NotificationConfig';
import {NotificationType} from '../types/NotificationType';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';
import {NotificationComponent} from '../components/notification/notification.component';

@Injectable()
export class NotificationService {
    private readonly DEFAULT_NOTIFICATION_CONFIG: NotificationConfig = {
        type: NotificationType.INFO,
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        message: ''
    };

    constructor(private snackBar: MatSnackBar) {
    }

    show(config: Partial<NotificationConfig>): MatSnackBarRef<NotificationComponent> {
        config.type = config.type || this.DEFAULT_NOTIFICATION_CONFIG.type;
        config.panelClass = config.type;
        config.data = {message: config.message, action: config.action, type: config.type};
        return this.snackBar.openFromComponent(NotificationComponent, {...this.DEFAULT_NOTIFICATION_CONFIG, ...config});
    }
}
