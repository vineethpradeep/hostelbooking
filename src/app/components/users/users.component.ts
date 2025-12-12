import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersService } from '../../services/user.service';
import { ApiResponse } from '../../models/api-response.model';
import { UserDto } from '../../models/user.model';

declare var bootstrap: any;  // For modal

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

  // Holds edited user data
  selectedUser: UserDto = {} as UserDto;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers(this.selectedPropertyId, this.selectedUserType)
      .subscribe({
        next: (res: ApiResponse<UserDto[]>) => {
          this.users = res.Data || [];
        },
        error: (err) => console.error("API ERROR:", err)
      });
  }

  // -------------------------
  // OPEN EDIT POPUP
  // -------------------------
  editUser(user: UserDto) {
    this.selectedUser = { ...user }; // copy user data into form
    const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
  }

  // -------------------------
  // SAVE UPDATED USER
  // -------------------------
  saveUser() {
    this.usersService.updateUser(this.selectedUser).subscribe({
      next: () => {
        alert("User updated successfully!");
        this.loadUsers();
      },
      error: (err) => console.error("Update Error:", err)
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
    modal.hide();
  }

  // -------------------------
  // DELETE USER
  // -------------------------
  deleteUser(userId: number | undefined) {
    if (!userId) return;

    if (confirm("Are you sure you want to delete this user?")) {
      this.usersService.deleteUserById(userId).subscribe({
        next: () => {
          alert("User deleted successfully!");
          this.loadUsers();
        },
        error: (err) => console.error("Delete Error:", err)
      });
    }
  }
}
