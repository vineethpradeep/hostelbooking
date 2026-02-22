import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.css'],
})
export class RoomFilterComponent {
  @Output() filterChanged = new EventEmitter<any>();

  filters = {
    search: '',
    minPrice: null,
    maxPrice: null,
    capacity: null,
  };

  applyFilters() {
    this.filterChanged.emit(this.filters);
  }

  resetFilters() {
    this.filters = { search: '', minPrice: null, maxPrice: null, capacity: null };
    this.filterChanged.emit(this.filters);
  }
}
