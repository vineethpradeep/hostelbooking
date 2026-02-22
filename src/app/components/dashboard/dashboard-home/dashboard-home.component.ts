import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DashboardService, SystemOverview } from '../../../services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  summary: any;
  recentBookings: any[] = [];
  recentPayments: any[] = [];
  systemOverview!: SystemOverview;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadSystemOverview();
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  // ================= DASHBOARD SUMMARY =================
  loadDashboard(): void {
    this.dashboardService.getSummary()
      .subscribe(res => {
        console.log('Summary:', res);
        this.summary = res;
      });

    this.dashboardService.getRecentBookings(5)
      .subscribe(res => {
        console.log('Recent Bookings:', res);
        this.recentBookings = res;
      });

    this.dashboardService.getRecentPayments(5)
      .subscribe(res => {
        console.log('Recent Payments:', res);
        this.recentPayments = res;
      });
  }

  // ================= SYSTEM OVERVIEW =================
 loadSystemOverview(): void {
  this.dashboardService.getSystemOverview()
    .subscribe(res => {
      this.systemOverview = res; // ✅ DIRECT ASSIGN
    });
}



  // ================= CHARTS =================
  initCharts(): void {

    const bar = document.getElementById('adminBarChart') as HTMLCanvasElement | null;
    if (bar) {
      new Chart(bar, {
        type: 'bar',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun'],
          datasets: [{
            label: 'Bookings',
            data: [45,55,60,75,80,70], // later from API
            backgroundColor: '#0d6efd'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: { ticks: { font: { size: 10 } } },
            y: { ticks: { font: { size: 10 } } }
          }
        }
      });
    }

    const dough = document.getElementById('adminDoughnut') as HTMLCanvasElement | null;
    if (dough) {
      new Chart(dough, {
        type: 'doughnut',
        data: {
          labels: ['Admin','Staff','Customers'],
          datasets: [{
            data: [8,24,68],
            backgroundColor: ['#0d6efd','#ff6384','#ffb400']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { font: { size: 10 }, boxWidth: 10, padding: 8 }
            }
          }
        }
      });
    }
  }
}
