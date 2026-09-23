import { signal, Injectable } from "@angular/core";
import { UserDto } from "../domains/user.dto";

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly _user = signal<UserDto | null>(null);
  readonly _users = signal<UserDto[]>([]);

  send(newUser: UserDto) {
    this._user.set(newUser);
    this._users.update(users => [...users, newUser]);
  }
}