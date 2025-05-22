import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

interface EventSummary {
  id: number;
  name: string;
  date: string; // תאריך חוזר כ-string מה-API (ISO)
}

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  imports: [CommonModule]
})
export class EventsComponent implements OnInit {
  events: EventSummary[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.fetchEventSummaries();
  }

  fetchEventSummaries() {
    const token = this.authService.getToken();

    if (!token) {
      console.error('No token found, authentication required.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<EventSummary[]>('https://localhost:7039/api/event/summaries', { headers }).subscribe(
      data => {
        this.events = data;
      },
      error => {
          console.error('Unauthorized request, redirecting to login...');
          this.router.navigate(['/login']);

      }
    );
  }

  viewEvent(eventId: number) {
    this.router.navigate(['/event', eventId]);
  }
}
