import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile = {
    name: '',
    email: '',
    phone: '',
    totalBookings: 0,
    status:''
  };

  loading = false;
  errorMessage = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
  debugger;
    // 🔹 OPTION A: from localStorage
    const userId = Number(localStorage.getItem('userId')) || 3;

    this.profileService.getProfile(userId).subscribe(res => {
      console.log('API Response:', res); // 🔍 debug

      this.profile.name = res.Name;
      this.profile.email = res.Email;
      this.profile.phone = res.Phone;
      this.profile.totalBookings = res.TotalBookings;
      this.profile.status = res.Status;
      
    });

  }

}