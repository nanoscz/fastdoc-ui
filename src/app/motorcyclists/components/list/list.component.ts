import { BehaviorSubject } from 'rxjs';
import { MotorcyclistService } from './../../../shared/services/motorcyclist.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  motorcyclists$ = new BehaviorSubject<any>([]);
  displayedColumns: string[] = ['name', 'surnames', 'licenseNumber', 'phone'];
  constructor(private router: Router, private motorcyclistService: MotorcyclistService) { }

  ngOnInit(): void {
    this.motorcyclistService.getAll().subscribe(data => {
      console.log(data);
      this.motorcyclists$.next(data);
    });
  }

  onRegister() {
    this.router.navigate(['/motorcyclists/new']);
  }
}
