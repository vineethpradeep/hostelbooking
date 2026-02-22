import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { DocumentDto } from '../../models/document.model';

declare var bootstrap: any;

@Component({
  selector: 'app-user-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-documents.component.html',
  styleUrls: ['./user-documents.component.css']
})
export class UserDocumentsComponent implements OnInit {

  userId!: number;
  userName = '';
  documents: DocumentDto[] = [];
  loading = false;

  // Upload form
  uploadDocType = '';
  uploadDocName = '';
  selectedFile: File | null = null;
  uploading = false;

  // Edit modal
  editDoc: DocumentDto = {} as DocumentDto;

  // Delete
  deleteDocId?: number;

  // View modal
  viewDoc: DocumentDto | null = null;

  // Toast
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';

  readonly docTypes = [
    'Aadhar Card',
    'PAN Card',
    'Passport',
    'Driving Licence',
    'Voter ID',
    'Rental Agreement',
    'Police Verification',
    'Other'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private docService: DocumentService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.userName = this.route.snapshot.queryParamMap.get('userName') ?? '';
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading = true;
    this.docService.getByUser(this.userId).subscribe({
      next: res => {
        this.documents = res.Data || [];
        this.loading = false;
      },
      error: err => {
        console.error('Load docs error:', err);
        this.loading = false;
      }
    });
  }

  // ── File Selection ─────────────────────────────
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (!this.uploadDocName) {
        this.uploadDocName = this.selectedFile.name.replace(/\.[^.]+$/, '');
      }
    }
  }

  // ── Upload Document ────────────────────────────
  uploadDocument(): void {
    if (!this.selectedFile || !this.uploadDocType || !this.uploadDocName) return;
    this.uploading = true;
    this.docService.upload(this.userId, this.selectedFile, this.uploadDocType, this.uploadDocName).subscribe({
      next: () => {
        this.uploading = false;
        this.selectedFile = null;
        this.uploadDocType = '';
        this.uploadDocName = '';
        this.resetFileInput();
        this.loadDocuments();
        this.showToast('Document uploaded successfully!', 'success');
        bootstrap.Modal.getInstance(document.getElementById('uploadDocModal'))?.hide();
      },
      error: err => {
        console.error('Upload error:', err);
        this.uploading = false;
        this.showToast('Upload failed. Please try again.', 'danger');
      }
    });
  }

  // ── Open Upload Modal ──────────────────────────
  openUploadModal(): void {
    this.uploadDocType = '';
    this.uploadDocName = '';
    this.selectedFile = null;
    this.resetFileInput();
    new bootstrap.Modal(document.getElementById('uploadDocModal')).show();
  }

  // ── Open Edit Modal ────────────────────────────
  openEditModal(doc: DocumentDto): void {
    this.editDoc = { ...doc };
    new bootstrap.Modal(document.getElementById('editDocModal')).show();
  }

  // ── Save Edit ──────────────────────────────────
  saveEdit(): void {
    this.docService.update(this.editDoc).subscribe({
      next: () => {
        this.loadDocuments();
        bootstrap.Modal.getInstance(document.getElementById('editDocModal'))?.hide();
        this.showToast('Document updated successfully!', 'success');
      },
      error: err => {
        console.error('Update error:', err);
        this.showToast('Update failed.', 'danger');
      }
    });
  }

  // ── Open View Modal ────────────────────────────
  openViewModal(doc: DocumentDto): void {
    this.viewDoc = doc;
    new bootstrap.Modal(document.getElementById('viewDocModal')).show();
  }

  // ── Open Delete Confirm ────────────────────────
  openDeleteModal(docId?: number): void {
    if (!docId) return;
    this.deleteDocId = docId;
    new bootstrap.Modal(document.getElementById('confirmDeleteDocModal')).show();
  }

  // ── Confirm Delete ─────────────────────────────
  confirmDelete(): void {
    if (!this.deleteDocId) return;
    this.docService.delete(this.deleteDocId).subscribe({
      next: () => {
        this.loadDocuments();
        bootstrap.Modal.getInstance(document.getElementById('confirmDeleteDocModal'))?.hide();
        this.showToast('Document deleted.', 'success');
      },
      error: err => {
        console.error('Delete error:', err);
        this.showToast('Delete failed.', 'danger');
      }
    });
  }

  // ── Back navigation ────────────────────────────
  goBack(): void {
    this.router.navigate(['/dashboard/users']);
  }

  // ── Helpers ────────────────────────────────────
  private resetFileInput(): void {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    if (input) input.value = '';
  }

  showToast(msg: string, type: 'success' | 'danger'): void {
    this.toastMessage = msg;
    this.toastType = type;
    const el = document.getElementById('docToast');
    if (el) new bootstrap.Toast(el, { delay: 3000 }).show();
  }

  isImage(url?: string): boolean {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

  isPdf(url?: string): boolean {
    if (!url) return false;
    return /\.pdf$/i.test(url);
  }
}
