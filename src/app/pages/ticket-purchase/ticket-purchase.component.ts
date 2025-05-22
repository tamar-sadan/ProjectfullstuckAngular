import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.component.html',
  styleUrls: ['./ticket-purchase.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule] 
})
export class TicketPurchaseComponent implements OnInit {
  eventId?: number;
  userId?: number;
  ticketData = {
    NumOfTickets: 1,
    needsAccessibleSeat: false,
    prefersCloserToStage: false,
    prefersAisleSeat: false,
    prefersCenter: false,
    PreferredRow: 0,  // העדיפות החדשה
  };
  
  alertMessage: string = '';
  alertClass: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.eventId = +params['id'];
      console.log('Event ID:', this.eventId);
    });

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        this.userId = decodedToken.userId;
        console.log('User ID:', this.userId);
      } catch (error) {
        alert('הייתה בעיה בקריאת הטוקן');
      }
    } else {
      alert('אנא התחבר לפני ביצוע הרכישה');
    }
  }

  onSubmit() {
    if (!this.userId) {
      alert('אנא התחבר לפני ביצוע הרכישה');
      return;
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const ticketPayload = {
      EventId: this.eventId,
      UserId: this.userId,
      NumOfTickets: this.ticketData.NumOfTickets,
      NeedsAccessibleSeat: this.ticketData.needsAccessibleSeat,
      PrefersCloserToStage: this.ticketData.prefersCloserToStage,
      PrefersAisleSeat: this.ticketData.prefersAisleSeat,
      PrefersCenter: this.ticketData.prefersCenter,
      PreferredRow: this.ticketData.PreferredRow,  // העדיפות החדשה
    };
    

    this.http.post('https://localhost:7039/api/tickets', ticketPayload, { headers })
      .subscribe(
        response => {
          console.log('Response:', response);
          this.alertMessage = 'הכרטיס נרכש בהצלחה פרטים ישלחו במייל!';
          this.alertClass = 'alert-success';
          setTimeout(() => {
            this.router.navigate(['/events']);
          }, 2000);
        },
        error => {
          console.error('Error response:', error);
          this.alertMessage = 'כמות התושבים האלא נגמרו :(';
          this.alertClass = 'alert-error';
        }
      );
  }
}
