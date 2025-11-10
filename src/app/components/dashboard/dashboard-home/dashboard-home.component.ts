import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  imports: [    CommonModule,
    RouterModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {
barChart: any;
  pieChart: any;

  bookingList = [
    { customer: "Ravi Kumar", room: "Premium Suite", date: "2025-02-10", status: "Confirmed" },
    { customer: "Priya Sharma", room: "Deluxe AC", date: "2025-02-11", status: "Pending" },
    { customer: "Arun Nair", room: "Standard Room", date: "2025-02-11", status: "Cancelled" },
    { customer: "Meera Joseph", room: "Premium Suite", date: "2025-02-12", status: "Confirmed" }
  ];

  ngAfterViewInit(): void {
    this.loadBarChart();
    this.loadPieChart();
  }

  loadBarChart() {
    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
          label: "Bookings",
          data: [45, 55, 60, 72, 80, 68]
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  loadPieChart() {
    this.pieChart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: ["Admin", "Staff", "Customers"],
        datasets: [{
          data: [5, 15, 40]
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
