import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../services/user.service';
import { PaymentService } from '../../services/payments.service';
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

  // ── Tab ──────────────────────────────────────
  activeTab: 'registered' | 'onboarded' = 'registered';

  // ── Data ─────────────────────────────────────
  users: UserDto[] = [];           // registered
  onboardedUsers: UserDto[] = [];  // onboarded
  selectedPropertyId = 3;
  selectedUserType = 'Tenant';
  currentUserRole: string = '';

  // ── Edit / Delete ─────────────────────────────
  selectedUser: UserDto = {} as UserDto;
  newUser: UserDto = this.emptyUser();
  deleteUserId?: number;
  
  // ── Search ────────────────────────────────────
  searchTerm = '';

  // ── Pagination ────────────────────────────────
  currentPage = 1;
  readonly pageSize = 5;

  // ── Payment ───────────────────────────────────
  paymentUser: UserDto | null = null;
  paymentForm = { paymentMethod: 'Cash', amount: 0 };
  paymentProcessing = false;
  paymentMethods = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque'];

  // ── Toast ─────────────────────────────────────
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';

  constructor(
    private usersService: UsersService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.currentUserRole = localStorage.getItem('app_role') || '';
    this.loadUsers();
    this.loadOnboardedUsers();
  

  }

  // ── Load Registered Users ─────────────────────
  loadUsers() {
    this.usersService
      .getUsers(this.selectedPropertyId, this.selectedUserType)
      .subscribe({
        next: (res: ApiResponse<UserDto[]>) => {
          this.users = res.Data || [];
          if (this.activeTab === 'registered') this.currentPage = 1;
        },
        error: err => console.error('Load users error:', err)
      });
  }

  // ── Load Onboarded Users ──────────────────────
  loadOnboardedUsers() {
    this.usersService.getOnboardedUsers(this.selectedPropertyId).subscribe({
      next: (res: ApiResponse<UserDto[]>) => {
        this.onboardedUsers = res.Data || [];
        if (this.activeTab === 'onboarded') this.currentPage = 1;
      },
      error: err => console.error('Load onboarded error:', err)
    });
  }

  // ── Tab Switch ────────────────────────────────
  switchTab(tab: 'registered' | 'onboarded') {
    this.activeTab = tab;
    this.searchTerm = '';
    this.currentPage = 1;
  }

  // ── Active source list ────────────────────────
  private get activeList(): UserDto[] {
    return this.activeTab === 'registered' ? this.users : this.onboardedUsers;
  }

  // ── Filtered list ─────────────────────────────
  get filteredUsers(): UserDto[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.activeList;
    return this.activeList.filter(u =>
      u.FirstName?.toLowerCase().includes(term) ||
      u.LastName?.toLowerCase().includes(term) ||
      u.EmailAddress?.toLowerCase().includes(term) ||
      u.PhoneNumber?.toLowerCase().includes(term) ||
      u.RoomNumber?.toLowerCase().includes(term)
    );
  }

  // ── Paged slice ───────────────────────────────
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

  onSearchChange(): void { this.currentPage = 1; }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  // ── Empty user factory ────────────────────────
  emptyUser(): UserDto {
    return {
      PropertyId: this.selectedPropertyId,
      UserType: 'Tenant',
      FirstName: '', LastName: '',
      EmailAddress: '', PhoneNumber: '',
      Password:'', ConfirmPassword:'',
      IsActive: true, CreatedDate: '',
      PropertyName: '', Roles: [], RoleIds: []
    };
  }

  // ── Add User ──────────────────────────────────
  openAddModal() {
    this.newUser = this.emptyUser();
    new bootstrap.Modal(document.getElementById('addUserModal')).show();
  }

  createUser(form: any) {

      if (form.invalid) {

    Object.values(form.controls).forEach((control: any) => {
      control.markAsTouched();
    });

    return;  // stop API call
  }
    this.usersService.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        bootstrap.Modal.getInstance(document.getElementById('addUserModal'))?.hide();
        form.resetForm();
      },
      error: err => console.error('Create Error:', err)
    });
  }

  // ── Edit User ─────────────────────────────────
  editUser(user: UserDto) {
    this.selectedUser = { ...user };
    new bootstrap.Modal(document.getElementById('editUserModal')).show();
  }

  openConfirmUpdateModal() {
    new bootstrap.Modal(document.getElementById('confirmUserUpdateModal')).show();
  }

  confirmSaveUser() {
    this.usersService.updateUser(this.selectedUser).subscribe({
      next: () => {
        this.loadUsers();
        this.loadOnboardedUsers();
        bootstrap.Modal.getInstance(document.getElementById('confirmUserUpdateModal'))?.hide();
        bootstrap.Modal.getInstance(document.getElementById('editUserModal'))?.hide();
      },
      error: err => console.error('Update Error:', err)
    });
  }

  // ── Delete User ───────────────────────────────
  openConfirmDeleteModal(userId?: number) {
    if (!userId) return;
    this.deleteUserId = userId;
    new bootstrap.Modal(document.getElementById('confirmUserDeleteModal')).show();
  }

  confirmDeleteUser() {
    if (!this.deleteUserId) return;
    this.usersService.deleteUserById(this.deleteUserId).subscribe({
      next: () => {
        this.loadUsers();
        this.loadOnboardedUsers();
        bootstrap.Modal.getInstance(document.getElementById('confirmUserDeleteModal'))?.hide();
      },
      error: err => console.error('Delete Error:', err)
    });
  }

  // ── Navigate ──────────────────────────────────
  addBooking(user: UserDto) {
    this.router.navigate(['/dashboard/bookings'], {
      queryParams: { userId: user.UserId, userName: user.FirstName + ' ' + user.LastName }
    });
  }

  viewDocuments(user: UserDto) {
    this.router.navigate(['/dashboard/users', user.UserId, 'documents'], {
      queryParams: { userName: user.FirstName + ' ' + user.LastName }
    });
  }

  viewProfile(user: UserDto) {
    this.router.navigate(['/dashboard/users', user.UserId, 'profile'], {
      state: { user }
    });
  }

  // ── Payment ───────────────────────────────────
  openPaymentModal(user: UserDto) {
    this.paymentUser = user;
    this.paymentForm = {
      paymentMethod: 'Cash',
      amount: user.RentAmount ?? 0
    };
    this.paymentProcessing = false;
    new bootstrap.Modal(document.getElementById('paymentModal')).show();
  }

  confirmPayment() {
    if (!this.paymentUser || !this.paymentForm.amount) return;
    this.paymentProcessing = true;

    const payload = {
      bookingId: this.paymentUser.BookingId ?? 0,
      paymentMethod: this.paymentForm.paymentMethod,
      totalAmount: this.paymentForm.amount
    };

    this.paymentService.createPayment(payload).subscribe({
      next: () => {
        this.paymentProcessing = false;
        bootstrap.Modal.getInstance(document.getElementById('paymentModal'))?.hide();
        this.showToast(
          `Payment of ₹${this.paymentForm.amount} collected from ${this.paymentUser?.FirstName}!`,
          'success'
        );
      },
      error: err => {
        console.error('Payment error:', err);
        this.paymentProcessing = false;
        this.showToast('Payment failed. Please try again.', 'danger');
      }
    });
  }

  // ── Toast ─────────────────────────────────────
  showToast(msg: string, type: 'success' | 'danger') {
    this.toastMessage = msg;
    this.toastType = type;
    const el = document.getElementById('usersToast');
    if (el) new bootstrap.Toast(el, { delay: 3500 }).show();
  }
}
