import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard-home.component.html',

  styleUrls: ['./dashboard-home.component.css']
})
export class AdminDashboardComponent implements AfterViewInit {

  // sample — replace with API calls as required
  ngAfterViewInit(): void {
    // Bar chart (monthly bookings)
    const bar = (document.getElementById('adminBarChart') as HTMLCanvasElement | null);
    if (bar) {
      new Chart(bar, {
        type: 'bar',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun'],
          datasets: [{ label:'Bookings', data:[45,55,60,75,80,70], backgroundColor:'#0d6efd' }]
        },
        options: { responsive:true, plugins:{ legend:{ display:false } } }
      });
    }

    // Doughnut (role distribution)
    const dough = (document.getElementById('adminDoughnut') as HTMLCanvasElement | null);
    if (dough) {
      new Chart(dough, {
        type: 'doughnut',
        data: { labels:['Admin','Staff','Customers'], datasets:[{ data:[8,24,68], backgroundColor:['#0d6efd','#ff6384','#ffb400'] }] },
        options: { responsive:true, plugins:{ legend:{ position:'bottom' } } }
      });
    }
  }
}
