import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasSession());
  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor() {}

  private hasSession(): boolean {
    return !!sessionStorage.getItem('user');
  }

  login(email: string, password: string): boolean {
    if (email === 'admin@example.com' && password === '123456') {
      sessionStorage.setItem('user', JSON.stringify({ email }));
      this.loggedIn.next(true); // 👈 trigger layout change
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.loggedIn.next(false); // 👈 update layout
  }
}
