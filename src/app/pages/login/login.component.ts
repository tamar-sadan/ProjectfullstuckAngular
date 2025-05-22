import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { log } from 'node:console';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule] 

})
export class LoginComponent {
  userData = {
    UserName: '',
    Password: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {

    if (!this.userData.UserName || !this.userData.Password) {
      this.errorMessage = 'אנא מלא את כל השדות';
      console.warn('שדות ריקים בטופס ההתחברות:', this.userData);
      return; // עצור כאן, לא ממשיכים עם הקריאה לשרת
    }
  
    this.authService.login(this.userData).pipe(
      catchError(error => {
        console.error('שגיאה בבקשה:', error);
        this.errorMessage = 'שם משתמש או סיסמה שגויים';
        return of(null);
      })
    ).subscribe({
      next: (res) => {
        if (res) {
          localStorage.setItem('token', res.token);
    
          // שליפת userId מה-token ושמירתו
          const token = res.token;
          try {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); 
            console.log('Decoded Token:', decodedToken);
    
            const userId = decodedToken.userId; // שליפת userId
            localStorage.setItem('userId', userId); // שמירתו ב-LocalStorage
            console.log('User ID:', userId);
          } catch (error) {
            console.error('Error decoding token:', error);
          }
    
          this.router.navigate(['/']);
        }
      }
    });
    
  }
    }  



