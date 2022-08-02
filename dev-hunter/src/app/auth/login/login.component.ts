import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { User } from '../interfaces/user.interface';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';


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
    private storageService: StorageService,
    public dialog: MatDialog
  ) { }

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
    });
  }

  onSubmit(): void {
    const email = this.formGroup.get('email');
    const password = this.formGroup.get('password');

    if (this.formGroup.valid) {

      const user: User = {
        email: email!.value,
        password: password!.value
      }

      this.authService.login$(user).pipe(take(1)).subscribe({
        next: ((resp: AuthResponse) => {
          if (resp) {
            this.storageService.storeUserData(resp.accessToken);
            this.router.navigate(['/home']);
          }
        }),
        error: (resp: HttpErrorResponse) => {
          this.errorMessage = resp.error;
          this.dialog.open(ModalComponent, { data: this.errorMessage });
        }
      });
    }
  }
}
