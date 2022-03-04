import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ClientService } from '../shared/services/client.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent implements OnInit {
  clients$ = new BehaviorSubject<any>([]);
  displayedColumns: string[] = ['name', 'surnames', 'licenseNumber', 'phone'];
  constructor(private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(data => this.clients$.next(data))
  }

}
