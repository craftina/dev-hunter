import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormValidators } from '../validators/form.validators';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
      ]],
      repassword: ['', [
        Validators.required
      ]]
    },
      {
        validators: [
          FormValidators.matchPass('password', 'repassword')
        ]
      })
  }


  onSubmit(): void {
    let email = this.formGroup.get('email');
    let password = this.formGroup.get('password');

    if (this.formGroup.valid) {

      const user: User = {
        email: email!.value,
        password: password!.value
      }

      this.authService.register$(user).pipe(take(1)).subscribe({
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
