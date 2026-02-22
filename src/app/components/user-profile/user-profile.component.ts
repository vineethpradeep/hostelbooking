import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: UserDto | null = null;
  userId?: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    // Pull user data passed via router navigation state
    const state = history.state;
    if (state && state.user) {
      this.user = state.user as UserDto;
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/users']);
  }

  getInitials(u: UserDto): string {
    return ((u.FirstName?.charAt(0) || '') + (u.LastName?.charAt(0) || '')).toUpperCase() || 'U';
  }
}
