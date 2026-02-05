import {
  Component,
  OnInit,
  ElementRef,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


import {
  MaintenanceRequest,
  UpcomingPayment
} from '../../../models/user-dashboard.model';
import { UserDashboardService } from '../../../services/user-dashboard.service';

interface MenuItem {
  label: string;
  url?: string;
  active: boolean;
}

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  // HEADER
  dynamicMenus: MenuItem[] = [];
  userName: string = '';
  menuOpen = false;
  isSticky = false;

  // DASHBOARD DATA
  bookingSummary: any = {};
  currentBooking: any;
  amenities: string = '';
  upcomingPayments: UpcomingPayment[] = [];
  maintenanceRequests: MaintenanceRequest[] = [];
  recentBookings: any[] = [];



  // Normally from JWT
userId!: number;
  roomId = 26;

  constructor(
    private router: Router,
    private el: ElementRef,
    private dashboardService: UserDashboardService
  ) {}

  ngOnInit(): void {

    // Username
    this.userName = localStorage.getItem('app_user') ?? 'User';
      // ✅ GET USER ID FROM LOCAL STORAGE (FROM LOGIN API)
  const storedUserId = localStorage.getItem('app_user_id');
  if (!storedUserId) {
    console.error('UserId not found. Redirecting to login.');
    this.logout();
    return;
  }
    this.userId = Number(storedUserId);

    // Header Menus
    const menuData = localStorage.getItem('UserHeaderMenus');
    if (menuData) {
      this.dynamicMenus = JSON.parse(menuData).map((m: any) => ({
        label: m.MenuName,
        url: m.MenuUrl,
        active: false
      }));
    }

    // Load dashboard data
    this.loadBookingSummary();   // ✅ ADD
    this.loadCurrentBooking();
    this.loadAmenities();
    this.loadUpcomingPayments();
    this.loadMaintenanceRequests();
   this.loadRecentBookings();
  }

  // ================= API LOADERS =================

  loadBookingSummary() {
    this.dashboardService.getDashboard(this.userId)
      .subscribe((res: any) => this.bookingSummary = res);
  }
  
  
   loadCurrentBooking() {
  this.dashboardService.getCurrentBooking(this.userId)
    .subscribe({
      next: res => {
        this.currentBooking = res;
      },
      error: err => console.error('Current Booking Error', err)
    });
}


  loadAmenities() {
    this.dashboardService.getRoomAmenities(this.roomId)
    
      .subscribe(res => this.amenities = res.Amenities);
  }

  loadUpcomingPayments() {
    this.dashboardService.getUpcomingPayments(this.userId)
      .subscribe(res => this.upcomingPayments = res);
  }

  loadMaintenanceRequests() {
    this.dashboardService.getMaintenanceRequests(this.userId)
      .subscribe(res => this.maintenanceRequests = res);
  }
 loadRecentBookings() {
  this.dashboardService.getRecentBookings(this.userId, 5)
    .subscribe({
      next: res => this.recentBookings = res,
      error: err => console.error(err)
    });
}

  

  // ================= ACTIONS =================

  payNow(payment?: UpcomingPayment) {
    console.log('Pay Now clicked', payment);
  }

  downloadReceipt() {
    console.log('Download Receipt clicked');
  }

  requestMaintenance() {
    console.log('Request Maintenance clicked');
  }

  extendBooking() {
    console.log('Extend Booking clicked');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const h = this.el.nativeElement.offsetHeight;
    this.isSticky = window.scrollY > h;
  }
}
