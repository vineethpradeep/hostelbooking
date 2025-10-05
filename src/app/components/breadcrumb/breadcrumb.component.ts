import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  @Input() title: string = '';
  @Input() paths: { label: string; url?: string }[] = [];
}
