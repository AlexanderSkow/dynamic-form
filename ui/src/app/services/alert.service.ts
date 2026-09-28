import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AlertService {
  readonly _message = signal<string | null>(null);
  readonly _status = signal<'success' | 'fail' | ''>('');

  sendMessage(message: string, status: boolean) {
    this._message.set(message);
    this._status.set(status ? 'success' : 'fail');
  }

  clear() {
    this._message.set(null);
    this._status.set('');
  }
}