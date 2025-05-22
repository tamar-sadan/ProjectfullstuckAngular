import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userData = {
    Name: '',
    Email: '',
    Password: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (!this.userData.Name || !this.userData.Email || !this.userData.Password) {
      this.errorMessage = 'אנא מלא את כל השדות';
      console.warn('שדות ריקים בטופס ההרשמה:', this.userData);
      return; // עצור כאן, לא ממשיכים עם הקריאה לשרת
    }
  
    this.authService.signup(this.userData).pipe(
       catchError(error => {
              console.error('שגיאה בבקשה:', error);
              this.errorMessage = 'שם משתמש או סיסמה שגויים';
              return of(null); 
            })
          ).subscribe({
            next: (res) => {
              if (res) {
                localStorage.setItem('token', res.token);
                this.router.navigate(['/']);
              }
            }
          });
  }
}
