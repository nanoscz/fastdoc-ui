import { NotificationService } from './../../../notification/services/notification.service';
import { UserService } from './../../../shared/services/user.service';
import { MotorcycleService } from './../../../shared/services/motorcycle.service';
import { MotorcyclistService } from './../../../shared/services/motorcyclist.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { catchError, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { NotificationType } from '../../../notification/types/NotificationType';

enum ROLE {
  CLIENT = 1,
  MOTORCYCLIST = 2,
  EMPLOYEE = 3
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private motorcyclistService: MotorcyclistService,
    private motorcycleService: MotorcycleService,
    private notificacionService: NotificationService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      motorcyclist: this.fb.group({
        name: ['', Validators.required],
        surnames: ['', Validators.required],
        licenseNumber: ['', Validators.required],
        phone: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required],
      }),
      motorcycle: this.fb.group({
        licensePlate: ['', Validators.required],
        color: ['', Validators.required],
        marca: ['', Validators.required]
      })
    });

    // this.motorcyclistNameField.valueChanges.subscribe((data) => this.motorcyclistLoginField.setValue(data));
  }

  onCancel() {
    this.router.navigate(['/motorcyclists/list']);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { motorcyclist, motorcycle } = this.form.value;

    const { login, password } = motorcyclist;

    this.userService.create({login, password, roleId: ROLE.MOTORCYCLIST}).pipe(
      switchMap((user: any) => this.motorcyclistService.create({
        name: motorcyclist.name,
        surnames: motorcyclist.surnames,
        licenseNumber: motorcyclist.licenseNumber,
        phone: motorcyclist.phone,
        userId: user.id
      }).pipe(
        catchError(() => throwError('Error al crear el motociclysta'))
      )),
      switchMap((motorcyclist: any) => this.motorcycleService.create({
        licensePlate: motorcycle.licensePlate,
        color: motorcycle.color,
        marca: motorcycle.marca,
        motorcyclistId: motorcyclist.id
      }).pipe(
        catchError(() => throwError('Error al crear la moto'))
      )),
      catchError(() => throwError('Error al crear las credenciales')),
    ).subscribe(() => {
      this.router.navigate(['/motorcyclists/list']);
    },
    (msgError: string) => {
      this.notificacionService.show({ message: msgError, type: NotificationType.INFO });
    });

  }

  get motorcyclistNameField(): FormControl {
    return this.form.get('motorcyclist').get('name') as FormControl;
  }

  get motorcyclistLoginField(): FormControl {
    return this.form.get('motorcyclist').get('login') as FormControl;
  }
}
