import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'alert-component',
  templateUrl: 'alert.html',
  styleUrl: 'alert.css',
})
export class AlertComponent {
  private router = inject(Router);
  public alertService = inject(AlertService);

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        takeUntilDestroyed()
      ) 
      .subscribe(() => this.alertService.clear());
  }
}