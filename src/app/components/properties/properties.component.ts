import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { PropertyDto } from '../../models/property.model';

declare var bootstrap: any;

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties: PropertyDto[] = [];
  searchTerm = '';
  currentPage = 1;
  readonly pageSize = 6;
  editingPropertyId?: number;
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  // Add / Edit form model
  formMode: 'add' | 'edit' = 'add';
  formData: PropertyDto = this.emptyForm();
  deletePropertyId: number | null=null;
  propertyForm!: FormGroup;
  submitted=false;
  // Toast
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';

  constructor(private propertyService: PropertyService,  private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProperties();
  }
  initForm() {
  this.propertyForm = this.fb.group({
    PropertyName: ['', [Validators.required, Validators.minLength(3)]],
    PropertyCode: [''], 
    EmailAddress: ['', [Validators.required, Validators.email]],
    Address: ['', [Validators.required, Validators.minLength(5)]],
    City: ['', Validators.required],
    State: ['', Validators.required],
    Country: ['', Validators.required],
    PostalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
    ContactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    TotalRooms: [null, [Validators.required, Validators.min(1)]],
    PropertyType: ['', Validators.required],
    IsActive: [true],
    Description: ['']
  });
}
   emptyForm(): PropertyDto {
     return {
      PropertyId: 0,
     PropertyName: '',
     PropertyCode: '',     // ✅ ADD
     Address: '',
     City: '',
   State: '',
     Country: '',          // ✅ ADD
     PostalCode: '',
     ContactNumber: '',
     EmailAddress: '',
     TotalRooms: 0,
     PropertyType: '',     // ✅ ADD
     IsActive: true,
     Description: ''
   };
   }

  // ── Load ──────────────────────────────────────────
  loadProperties(){
    this.propertyService.getAll().subscribe({
      next: res => {
        this.properties = res ?? [];
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
      p.EmailAddress?.toLowerCase().includes(t)
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
    //this.formData = this.emptyForm();
    this.submitted = false;
    this.propertyForm.reset({ IsActive: true });
     const formModalEl = document.getElementById('propertyFormModal');
  const formModal = bootstrap.Modal.getOrCreateInstance(formModalEl);
  formModal.show();
  }

  // ── Open Edit Modal ────────────────────────────────
 openEditModal(prop: PropertyDto): void {

  this.formMode = 'edit';
  this.submitted = false;
  this.editingPropertyId = prop.PropertyId;
  this.propertyForm.patchValue(prop);

  // 🔥 Close delete modal if open
  const deleteModalEl = document.getElementById('confirmDeleteModal');
  bootstrap.Modal.getInstance(deleteModalEl)?.hide();

  const formModalEl = document.getElementById('propertyFormModal');
  const formModal = bootstrap.Modal.getOrCreateInstance(formModalEl);
  formModal.show();
}

  // ── Save (Add or Edit) ─────────────────────────────
saveProperty() {

  this.submitted = true;

  if (this.propertyForm.invalid) {
    this.propertyForm.markAllAsTouched();
    return;
  }

  const formValue = { ...this.propertyForm.value };

  if (this.formMode === 'add') {

    formValue.PropertyCode = this.generatePropertyCode();

    this.propertyService.create(formValue).subscribe({
      next: () => {
        this.loadProperties();
        this.hideModal('propertyFormModal');
        this.propertyForm.reset({ IsActive: true });
        this.submitted = false;
        this.showToast('Property added successfully!', 'success');
      },
      error: err => {
        console.error(err);
        this.showToast('Failed to add property.', 'danger');
      }
    });

  } else {

    // ✅ attach ID properly
    const payload = {
      ...formValue,
      PropertyId: this.editingPropertyId
    };

    this.propertyService.update(payload).subscribe({
      next: () => {
        this.loadProperties();
        this.hideModal('propertyFormModal');
        this.submitted = false;
        this.showToast('Property updated successfully!', 'success');
      },
      error: err => {
        console.error(err);
        this.showToast('Failed to update property.', 'danger');
      }
    });

  }
}
  generatePropertyCode(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  return 'PG' + random;
}

  // ── Open Delete Confirm ────────────────────────────
openDeleteModal(id: number) {
  this.deletePropertyId = id;
  const modal = new bootstrap.Modal(this.deleteModal.nativeElement);
  modal.show();
}
  // ── Confirm Delete ─────────────────────────────────
confirmDelete() {
  debugger;
  console.log("Confirm:", this.deletePropertyId);

  if (this.deletePropertyId == null) return;

  this.propertyService.delete(this.deletePropertyId).subscribe({
    next: () => {
      this.loadProperties();
      this.hideModal('confirmDeleteModal');
      this.deletePropertyId = null;
    }
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
    get f() {
    return this.propertyForm.controls;
  }
}
