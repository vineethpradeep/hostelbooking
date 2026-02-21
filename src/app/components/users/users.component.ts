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
  styleUrls: ['./users.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UsersComponent implements OnInit {

  users: UserDto[] = [];
  selectedPropertyId = 3;
  selectedUserType = 'Tenant';

  selectedUser: UserDto = {} as UserDto;
  deleteUserId?: number;

  // Search
  searchTerm = '';

  // Pagination
  currentPage = 1;
  readonly pageSize = 5;

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
          this.currentPage = 1;
        },
        error: err => console.error('API ERROR:', err)
      });
  }

  // ── Filtered list ──
  get filteredUsers(): UserDto[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.users;
    return this.users.filter(u =>
      u.FirstName?.toLowerCase().includes(term) ||
      u.LastName?.toLowerCase().includes(term) ||
      u.EmailAddress?.toLowerCase().includes(term) ||
      u.PhoneNumber?.toLowerCase().includes(term)
    );
  }

  // ── Current page slice ──
  get pagedUsers(): UserDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredUsers.length);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
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
