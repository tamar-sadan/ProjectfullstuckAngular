import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EventsComponent } from './pages/events/events.component'; 
import { EventDetailComponent } from './pages/event-detail/event-detail.component'; 
import { AuthGuard } from './guards/auth.guard';
import { TicketPurchaseComponent } from './pages/ticket-purchase/ticket-purchase.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  { path: '', component: HomeComponent },  
  { path: 'signup', component: SignupComponent },  
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] }, 
  { path: 'event/:id', component: EventDetailComponent, canActivate: [AuthGuard] },
  { path: 'protected', canActivate: [AuthGuard], component: HomeComponent }  ,
  { path: 'ticket-purchase/:id', component: TicketPurchaseComponent }

];


