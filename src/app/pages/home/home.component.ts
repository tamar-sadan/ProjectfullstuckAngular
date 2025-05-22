import { Component } from '@angular/core';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);  // ניווט לדף התחברות
  }

  goToEvents() {
    this.router.navigate(['/events']);  // ניווט לדף האירועים
  }
}

