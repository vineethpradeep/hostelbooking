import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PreloaderDirective } from '../../../directives/preloader.directive';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    PreloaderDirective
  ],
  templateUrl: './layout.component.html',
})
export class PublicLayoutComponent {}
