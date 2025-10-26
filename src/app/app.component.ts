import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <div class="container">
        <ul>
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/transfer-state">Transfer State</a></li>
          <li><a routerLink="/platform-check">Platform Check</a></li>
          <li><a routerLink="/seo">SEO Meta Tags</a></li>
        </ul>
      </div>
    </nav>
    
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
