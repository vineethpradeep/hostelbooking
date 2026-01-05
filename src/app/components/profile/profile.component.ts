import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile = {
    name: '',
    email: '',
    phone: '',
   
    status: ''
  };

  editProfile: any = {};
  saving = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
      const storedUserId = localStorage.getItem('app_user_id');

  if (!storedUserId) {
    console.error('UserId not found in localStorage');
    return;
  }

  const userId = Number(storedUserId);

    this.profileService.getProfile(userId).subscribe(res => {
      this.profile = {
        name: res.Name,
        email: res.Email,
        phone: res.Phone,
       
        status: res.Status
      };
    });
  }

  openEditModal() {
    this.editProfile = { ...this.profile };
    new bootstrap.Modal(
      document.getElementById('editProfileModal')
    ).show();
  }

  openConfirmModal() {
    new bootstrap.Modal(
      document.getElementById('confirmUpdateModal')
    ).show();
  }

  confirmSaveProfile() {
    this.saving = true;

    const payload = {
      userId: Number(localStorage.getItem('userId')) || 3,
      name: this.editProfile.name,
      phone: this.editProfile.phone,
      email: this.editProfile.email
    };

    this.profileService.updateProfile(payload).subscribe({
      next: () => {
        this.profile = { ...this.editProfile };
        this.saving = false;

        bootstrap.Modal.getInstance(
          document.getElementById('confirmUpdateModal')
        )?.hide();

        bootstrap.Modal.getInstance(
          document.getElementById('editProfileModal')
        )?.hide();

        this.showSuccessModal();
      },
      error: () => {
        this.saving = false;
        this.showErrorModal();
      }
    });
  }

  showSuccessModal() {
    new bootstrap.Modal(
      document.getElementById('successModal')
    ).show();
  }

  showErrorModal() {
    new bootstrap.Modal(
      document.getElementById('errorModal')
    ).show();
  }
}
