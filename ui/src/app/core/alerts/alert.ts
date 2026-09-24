import { Component, signal } from "@angular/core";

@Component({
  selector: 'alert-component',
  templateUrl: 'alert.html',
  styleUrl: 'alert.css',
})
export class AlertComponent {
  public message = signal<string>('');
  public hasError = signal<boolean>(false);

  hasMessage() {
    return this.message() !== '';
  }

  sendMessage(message: string, hasError: boolean): void {
    this.message.set(message);
    this.hasError.set(hasError);
  }

  determineMessageClass(): string {
    return this.hasError() ? 'success' : 'fail';
  }
}