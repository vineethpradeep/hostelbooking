import { Component, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // isLandingPage = false;
  // isSticky = false;

  // constructor(private router: Router, private el: ElementRef) {
  //   this.router.events
  //     .pipe(filter((e) => e instanceof NavigationEnd))
  //     .subscribe((e: any) => {
  //       this.isLandingPage =
  //         e.urlAfterRedirects === '/' || e.urlAfterRedirects === '/home';
  //       this.isSticky = false;
  //     });
  // }

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   if (this.isLandingPage) return;

  //   const headerHeight = this.el.nativeElement.offsetHeight;
  //   this.isSticky = window.scrollY > headerHeight;
  // }

  isSticky = false;

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const headerHeight = this.el.nativeElement.offsetHeight;
    this.isSticky = window.scrollY > headerHeight;
  }
}
