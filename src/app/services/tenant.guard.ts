import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TenantGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getRole() === 'Tenant') return true;

    this.router.navigate(['/']);
    return false;
  }
}
