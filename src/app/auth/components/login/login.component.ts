import { MotorcyclistService } from './../../../shared/services/motorcyclist.service';
import { ClientService } from './../../../shared/services/client.service';
import { EmployeeService } from './../../../shared/services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RoleService } from '../../../shared/services/role.service';
import { SessionService } from '../../../shared/services/session.service';
import { AuthService } from '../../services/auth.service';
import { ROLE } from '../../../shared/types/Role';
type Session = any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msgError$ = new BehaviorSubject<string>(null);
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private roleService: RoleService,
    private employeeService: EmployeeService,
    private clientService: ClientService,
    private motorcyclistService: MotorcyclistService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    this.route.navigate(['/auth/register'])
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    console.log(this.form.value);

    const { username, password } = this.form.value;
    this.authService.login({ login: username, password }).pipe(
      switchMap((session: any) => {
        return this.roleService.getOne(session.roleId).pipe(
          map((role) => ({
            ...session,
            userId: session.id,
            ...role
          }))
        );
      }),
      switchMap((sessionRole: any) => {
        if (sessionRole.roleId === ROLE.CLIENT) {
          return this.clientService.getOneByUserId(sessionRole.userId).pipe(
            map((data) => ({
              ...data,
              clientId: data.id,
              roleId: sessionRole.roleId
            }))
          );
        } else if (sessionRole.roleId === ROLE.MOTORCYCLIST) {
          return this.motorcyclistService.getOneByUserId(sessionRole.userId).pipe(
            map((data) => ({
              ...data,
              motorcyclistId: data.id,
              roleId: sessionRole.roleId
            }))
          );
        } else {
          return this.employeeService.getOneByUserId(sessionRole.userId).pipe(
            map((data) => ({
              ...data,
              employeeId: data.id,
              roleId: sessionRole.roleId
            }))
          );
        }
      })
    ).subscribe(
      (data: any) => {
        console.log(data);
        this.sessionService.setSession(data);
        this.route.navigate(['/orders']);
      },
      ((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  handleError(data: HttpErrorResponse): void {
    const { message, name } =  data.error;
    if (name === 'Authentication Error.') {
      this.snackBar.open(message, 'OK');
    } else {
      this.snackBar.open('Error de servidor', 'OK');
    }
  }
}
