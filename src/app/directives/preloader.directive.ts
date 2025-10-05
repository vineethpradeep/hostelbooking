import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appPreloader]',
})
export class PreloaderDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    window.addEventListener('load', () => {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition',
        'opacity 0.5s ease'
      );
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');

      setTimeout(() => {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      }, 500);
    });
  }
}
