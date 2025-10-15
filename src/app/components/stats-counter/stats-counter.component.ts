import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

@Component({
  selector: 'app-stats-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-counter.component.html',
  styleUrls: ['./stats-counter.component.css'],
})
export class StatsCounterComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  stats: Stat[] = [
    { value: 200, suffix: '+', label: 'Happy Residents', duration: 1400 },
    { value: 4, suffix: '', label: 'Properties', duration: 1000 },
    { value: 9, suffix: '+', label: 'Years of Service', duration: 1200 },
  ];

  private observersStarted = false;

  ngAfterViewInit(): void {
    const el = this.container.nativeElement;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.observersStarted) {
            this.observersStarted = true;
            this.startAllCounters();
            io.disconnect();
          }
        });
      },
      { root: null, threshold: 0.25 }
    );

    io.observe(el);
  }

  private startAllCounters() {
    const statEls =
      this.container.nativeElement.querySelectorAll<HTMLElement>('.stat-value');
    statEls.forEach((el, idx) => {
      const stat = this.stats[idx];
      this.animateCount(
        el,
        stat.value,
        stat.duration ?? 1200,
        stat.suffix ?? ''
      );
    });
  }

  private animateCount(
    targetEl: HTMLElement,
    endValue: number,
    duration = 1200,
    suffix = ''
  ) {
    const start = performance.now();
    const initial = 0;
    const delta = endValue - initial;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(initial + delta * eased);

      targetEl.textContent = this.formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        targetEl.textContent = this.formatNumber(endValue) + suffix;
      }
    };

    requestAnimationFrame(step);
  }

  private formatNumber(n: number) {
    return n.toLocaleString();
  }
}
