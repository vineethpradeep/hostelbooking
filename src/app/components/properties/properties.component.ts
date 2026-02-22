import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { PropertyDto } from '../../models/property.model';

declare var bootstrap: any;

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties: PropertyDto[] = [];
  searchTerm = '';
  currentPage = 1;
  readonly pageSize = 6;

  // Add / Edit form model
  formMode: 'add' | 'edit' = 'add';
  formData: PropertyDto = this.emptyForm();
  deletePropertyId?: number;

  // Toast
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  emptyForm(): PropertyDto {
    return {
      PropertyName: '', Address: '', City: '', State: '',
      PinCode: '', ContactNumber: '', Email: '',
      TotalRooms: 0, IsActive: true, Description: ''
    };
  }

  // ── Load ──────────────────────────────────────────
  loadProperties(): void {
    this.propertyService.getAll().subscribe({
      next: res => {
        this.properties = res.Data || [];
        this.currentPage = 1;
      },
      error: err => console.error('Load error:', err)
    });
  }

  // ── Search / Pagination ───────────────────────────
  get filtered(): PropertyDto[] {
    const t = this.searchTerm.trim().toLowerCase();
    if (!t) return this.properties;
    return this.properties.filter(p =>
      p.PropertyName?.toLowerCase().includes(t) ||
      p.City?.toLowerCase().includes(t) ||
      p.State?.toLowerCase().includes(t) ||
      p.Email?.toLowerCase().includes(t)
    );
  }

  get paged(): PropertyDto[] {
    const s = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(s, s + this.pageSize);
  }

  get totalPages(): number { return Math.ceil(this.filtered.length / this.pageSize); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  get startIndex(): number { return (this.currentPage - 1) * this.pageSize + 1; }
  get endIndex(): number { return Math.min(this.currentPage * this.pageSize, this.filtered.length); }

  onSearchChange(): void { this.currentPage = 1; }
  goToPage(p: number): void { if (p >= 1 && p <= this.totalPages) this.currentPage = p; }

  // ── Open Add Modal ─────────────────────────────────
  openAddModal(): void {
    this.formMode = 'add';
    this.formData = this.emptyForm();
    new bootstrap.Modal(document.getElementById('propertyFormModal')).show();
  }

  // ── Open Edit Modal ────────────────────────────────
  openEditModal(prop: PropertyDto): void {
    this.formMode = 'edit';
    this.formData = { ...prop };
    new bootstrap.Modal(document.getElementById('propertyFormModal')).show();
  }

  // ── Save (Add or Edit) ─────────────────────────────
  saveProperty(): void {
    if (this.formMode === 'add') {
      this.propertyService.create(this.formData).subscribe({
        next: () => {
          this.loadProperties();
          this.hideModal('propertyFormModal');
          this.showToast('Property added successfully!', 'success');
        },
        error: err => { console.error(err); this.showToast('Failed to add property.', 'danger'); }
      });
    } else {
      this.propertyService.update(this.formData).subscribe({
        next: () => {
          this.loadProperties();
          this.hideModal('propertyFormModal');
          this.showToast('Property updated successfully!', 'success');
        },
        error: err => { console.error(err); this.showToast('Failed to update property.', 'danger'); }
      });
    }
  }

  // ── Open Delete Confirm ────────────────────────────
  openDeleteModal(id?: number): void {
    if (!id) return;
    this.deletePropertyId = id;
    new bootstrap.Modal(document.getElementById('confirmDeleteModal')).show();
  }

  // ── Confirm Delete ─────────────────────────────────
  confirmDelete(): void {
    if (!this.deletePropertyId) return;
    this.propertyService.delete(this.deletePropertyId).subscribe({
      next: () => {
        this.loadProperties();
        this.hideModal('confirmDeleteModal');
        this.showToast('Property deleted.', 'success');
      },
      error: err => { console.error(err); this.showToast('Failed to delete property.', 'danger'); }
    });
  }

  // ── Helpers ───────────────────────────────────────
  private hideModal(id: string): void {
    bootstrap.Modal.getInstance(document.getElementById(id))?.hide();
  }

  showToast(msg: string, type: 'success' | 'danger'): void {
    this.toastMessage = msg;
    this.toastType = type;
    const el = document.getElementById('propToast');
    if (el) new bootstrap.Toast(el, { delay: 3000 }).show();
  }
}
