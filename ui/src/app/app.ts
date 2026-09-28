import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, NavigationEnd, Router } from '@angular/router';
import { AlertComponent } from './core/alerts/alert.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private router = inject(Router);
  public notOnHomePage = signal<boolean>(false);

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const notOnHome = this.router.url !== '/';
        this.notOnHomePage.set(notOnHome);
      });
  }
}
