import { Component, inject, } from "@angular/core";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'alert-component',
  templateUrl: 'alert.html',
  styleUrl: 'alert.css',
})
export class AlertComponent {
  public alertService = inject(AlertService);
}