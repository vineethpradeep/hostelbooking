import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component, ElementRef, HostListener } from '@angular/core';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { ServicesComponent } from '../../services/services.component';
import { FooterComponent } from '../../footer/footer.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';



@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AboutUsComponent,
    ServicesComponent,
    AdminHeaderComponent,
    FooterComponent    
  ],
  templateUrl: './layout.component.html',
})
export class DashBoardLayoutComponent {

 

}

