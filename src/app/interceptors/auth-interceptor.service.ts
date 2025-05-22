// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorService {

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // הוספת הטוקן לבקשה
//     const clonedRequest = req.clone({
//       setHeaders: {
//         Authorization: 'Bearer YOUR_TOKEN' // שים כאן את הטוקן שלך
//       }
//     });

//     return next.handle(clonedRequest); // מבצע את הבקשה
//   }
// }
