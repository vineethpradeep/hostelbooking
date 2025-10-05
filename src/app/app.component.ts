import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreloaderDirective } from './directives/preloader.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PreloaderDirective, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'hostel-booking';
}
