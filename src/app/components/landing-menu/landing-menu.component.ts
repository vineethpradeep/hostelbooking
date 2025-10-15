import {
  Component,
  AfterViewInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-landing-menu',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  template: `<div #menuContainer class="landing-menu">
    <app-menu></app-menu>
  </div>`,
  styleUrls: ['./landing-menu.component.css'],
})
export class LandingMenuComponent implements AfterViewInit {
  private menu!: HTMLElement;
  private hero!: HTMLElement;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.menu = this.el.nativeElement.querySelector('.landing-menu');
    this.hero = document.querySelector('.hero-section') as HTMLElement;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.menu || !this.hero) return;

    const heroBottom = this.hero.getBoundingClientRect().bottom;

    if (heroBottom <= 0) {
      this.menu.classList.add('sticky');
    } else {
      this.menu.classList.remove('sticky');
    }
  }
}
