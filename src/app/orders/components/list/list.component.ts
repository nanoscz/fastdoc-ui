import { SessionService } from './../../../shared/services/session.service';
import { ShippingDetailService } from './../../../shared/services/shipping-detail.service';
import { ShippingDocumentService } from './../../../shared/services/shipping-document.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AssignDialogComponent } from '../assign-dialog/assign-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  shippingDocuments$ =  new BehaviorSubject<any[]>([])
  displayedColumns: string[] = ['date', 'payment', 'state', 'action'];
  isClient = false;
  isEmployee = false;
  isMotorcyclist = false;
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private shippingDocumentService: ShippingDocumentService,
    private shippingDetailService: ShippingDetailService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isClient = this.sessionService.isClient();
    this.isEmployee = this.sessionService.isEmployee();
    this.isMotorcyclist = this.sessionService.isMotorcyclist();

    this.getShippingDocuments()
  }

  getShippingDocuments() {
    this.shippingDocumentService.getAll().pipe(
      map((data) => this.filterBySession(data))
    ).subscribe((list) => {
      this.shippingDocuments$.next(list)
    })
  }

  filterBySession(data) {
    console.log(data)
    const session =  this.sessionService.getSession();
    if (this.isClient) {
      return data.filter((item) => item.clientId === session.clientId)
    } if (this.isMotorcyclist) {
      return data.filter((item) => item.motorcyclistId === session.motorcyclistId)
    }
    return data
  }

  toAssign(data) {
    const dialogRef = this.dialog.open(AssignDialogComponent, {
      width: '400px',
      data
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getShippingDocuments()
      }
    })
  }

  onRegister() {
    this.router.navigate(['/orders/new']);
  }
}
