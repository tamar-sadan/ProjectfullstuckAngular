import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common'; // הוסף את CommonModule כאן

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  providers: [DatePipe],
  standalone: true,
  imports: [CommonModule] // הוסף את CommonModule גם כאן
})
export class EventDetailComponent implements OnInit {
  event: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const eventId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchEventDetails(eventId);
  }

  fetchEventDetails(eventId: string | null) {
    if (eventId) {
      this.http.get(`https://localhost:7039/api/event/${eventId}`).subscribe(
        (data: any) => {
          this.event = data;
        },
        error => {
          console.error('Error fetching event details', error);
        }
      );
    }
  }

  goToTicketPurchase() {
    this.router.navigate(['/ticket-purchase', this.event.id]);
  }
}
