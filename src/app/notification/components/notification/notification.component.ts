import {Component, Inject, OnInit} from '@angular/core';
import {NotificationType} from '../../types/NotificationType';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {NotificationConfig} from '../../types/NotificationConfig';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    notificationIconMap = new Map<NotificationType, string>([
        [NotificationType.INFO, 'ionicons:information-circle-outline'],
        [NotificationType.ERROR, 'ionicons:alert-circle-outline'],
        [NotificationType.WARNING, 'ionicons:warning-outline'],
        [NotificationType.SUCCESS, 'ionicons:checkmark-circle-outline']
    ]);

    constructor(
        public snackBarRef: MatSnackBarRef<NotificationComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public notificationConfig: NotificationConfig
    ) {
    }

    ngOnInit(): void {
    }

    dismissWithAction(): void {
        this.snackBarRef.dismissWithAction();
    }

}
