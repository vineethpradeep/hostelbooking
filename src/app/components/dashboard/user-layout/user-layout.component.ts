import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { ServicesComponent } from '../../services/services.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-user-layout',
  imports: [
    CommonModule,
    RouterModule,
    AboutUsComponent,
    ServicesComponent,
    AdminHeaderComponent,
    FooterComponent    
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
