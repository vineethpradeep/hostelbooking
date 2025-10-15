import { Component, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuChild {
  label: string;
  url: string;
}

interface MenuItem {
  label: string;
  url?: string;
  active: boolean;
  open?: boolean;
  children?: MenuChild[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  menu: MenuItem[] = [
    { label: 'Home', url: '/', active: true },
    { label: 'Rooms', url: '/rooms', active: false },
    { label: 'About', url: '/about', active: false },
    { label: 'Facilities', url: '/facilities', active: false },
    // {
    //   label: 'Services',
    //   active: false,
    //   open: false,
    //   children: [
    //     { label: 'WiFi', url: '/services/wifi' },
    //     { label: 'Laundry', url: '/services/laundry' },
    //     { label: 'Meals', url: '/services/meals' },
    //   ],
    // },
    { label: 'Contact', url: '/contact', active: false },
  ];

  isSticky = false;
  menuOpen = false;

  constructor(private router: Router, private el: ElementRef) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (window.innerWidth < 992) {
          this.menuOpen = false;
        }
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const headerHeight = this.el.nativeElement.offsetHeight;
    this.isSticky = window.scrollY > headerHeight;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown(item: MenuItem, event: Event) {
    if (!this.hasChildren(item)) return;
    event.preventDefault();
    item.open = !item.open;
  }

  hasChildren(item: MenuItem): boolean {
    return Array.isArray(item.children) && item.children.length > 0;
  }

  onNavigate(): void {
    if (window.innerWidth < 992) {
      this.menuOpen = false;
    }
  }
}
