import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersService } from '../../services/user.service';
import { ApiResponse } from '../../models/api-response.model';
import { UserDto } from '../../models/user.model';

declare var bootstrap: any;

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [CommonModule, FormsModule]
})
export class UsersComponent implements OnInit {

  users: UserDto[] = [];
  selectedPropertyId = 3;
  selectedUserType = 'Tenant';

  selectedUser: UserDto = {} as UserDto;
  deleteUserId?: number;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ================= LOAD USERS =================
  loadUsers() {
    this.usersService
      .getUsers(this.selectedPropertyId, this.selectedUserType)
      .subscribe({
        next: (res: ApiResponse<UserDto[]>) => {
          this.users = res.Data || [];
        },
        error: err => console.error('API ERROR:', err)
      });
  }

  // ================= OPEN EDIT MODAL =================
  editUser(user: UserDto) {
    this.selectedUser = { ...user };
    new bootstrap.Modal(
      document.getElementById('editUserModal')
    ).show();
  }

  // ================= OPEN CONFIRM UPDATE MODAL =================
  openConfirmUpdateModal() {
    new bootstrap.Modal(
      document.getElementById('confirmUserUpdateModal')
    ).show();
  }

  // ================= CONFIRM UPDATE =================
  confirmSaveUser() {
    this.usersService.updateUser(this.selectedUser).subscribe({
      next: () => {
        this.loadUsers();

        bootstrap.Modal.getInstance(
          document.getElementById('confirmUserUpdateModal')
        )?.hide();

        bootstrap.Modal.getInstance(
          document.getElementById('editUserModal')
        )?.hide();
      },
      error: err => console.error('Update Error:', err)
    });
  }

  // ================= OPEN CONFIRM DELETE MODAL =================
  openConfirmDeleteModal(userId?: number) {
    if (!userId) return;
    this.deleteUserId = userId;

    new bootstrap.Modal(
      document.getElementById('confirmUserDeleteModal')
    ).show();
  }

  // ================= CONFIRM DELETE =================
  confirmDeleteUser() {
    if (!this.deleteUserId) return;

    this.usersService.deleteUserById(this.deleteUserId).subscribe({
      next: () => {
        this.loadUsers();

        bootstrap.Modal.getInstance(
          document.getElementById('confirmUserDeleteModal')
        )?.hide();
      },
      error: err => console.error('Delete Error:', err)
    });
  }
}
