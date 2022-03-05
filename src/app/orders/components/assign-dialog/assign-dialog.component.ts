import { ShippingDocumentService } from './../../../shared/services/shipping-document.service';
import { MotorcyclistService } from './../../../shared/services/motorcyclist.service';
import { MotorcycleService } from './../../../shared/services/motorcycle.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '../../../shared/services/session.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.scss']
})
export class AssignDialogComponent implements OnInit {
  motorcyclistControl = new FormControl();
  motorcyclists$ = new BehaviorSubject<any[]>([])
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AssignDialogComponent>,
    private motorcyclistService: MotorcyclistService,
    private shippingDocumentService: ShippingDocumentService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.motorcyclistService.getAll().subscribe((data) => this.motorcyclists$.next(data))
    console.log(this.data)
  }


  toAssign() {
    const session = this.sessionService.getSession();

    this.shippingDocumentService.update(this.data.id, {
      employeeId: session.employeeId,
      motorcyclistId: this.motorcyclistControl.value
    }).subscribe(() => {
      this.dialogRef.close(this.data);
    })
  }
}
