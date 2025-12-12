import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {

    // ✅ Must be logged in AND admin
    if (this.auth.isLoggedIn() && this.auth.getRole() === 'Admin') {
      return true;
    }

    // ❌ Not admin → redirect
    this.router.navigate(['/']);
    return false;
  }
}
