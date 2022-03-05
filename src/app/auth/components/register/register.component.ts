import { ClientService } from './../../../shared/services/client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SessionService } from '../../../shared/services/session.service';
import { AuthService } from '../../services/auth.service';
import { ROLE } from '../../../shared/types/Role';
import { UserService } from '../../../shared/services/user.service';
type Session = any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  msgError$ = new BehaviorSubject<string>(null);
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private clientService: ClientService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.route.navigate(['/auth/login'])
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    console.log(this.form.value);

    const { name, surnames, phone, username, password } = this.form.value;
    this.userService.create({login: username, password, roleId: ROLE.CLIENT}).pipe(
      switchMap((user: any) => this.clientService.create({
        name,
        surnames,
        phone,
        userId: user.id
      }).pipe(
        map((data) => ({
          ...data,
          roleId: ROLE.CLIENT
        }))
      ))
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
