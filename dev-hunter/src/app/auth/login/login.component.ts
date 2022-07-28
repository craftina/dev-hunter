import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Login } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  errorMessage!: string;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  get emailFormCotrol(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }
  get passwordFormCotrol(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-z]+@[a-z]+\.[a-z]+/g)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/g)
      ]]
    })
  }

  onSubmit(): void {
    let email = this.formGroup.get('email');
    let password = this.formGroup.get('password');

    if (email?.valid && password?.valid) {

      const user: Login = {
        email: this.formGroup.value.email,
        password: this.formGroup.value.password
      }

      this.authService.login$(user).pipe(take(1)).subscribe({
        next: ((resp: User) => {
          if (resp) {
            this.storageService.storeUserData(resp);
            this.router.navigate(['/home']);
          }
        }),
        error: (resp: HttpErrorResponse) => {
          this.errorMessage = resp.error;
          window.alert(this.errorMessage)
        }
      });
    }
  }
}
