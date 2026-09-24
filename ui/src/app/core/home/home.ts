import { Component, inject, OnInit, signal} from '@angular/core';
import {RouterLinkWithHref } from '@angular/router';
import { UserDto } from '../../domains/user.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterLinkWithHref],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private userService = inject(UserService);

  public users = signal<UserDto[]>([]);
  protected readonly title = signal('Dynamic Form Home Page');

  ngOnInit() {
    this.getUsers();
  }
  
  private getUsers() {
    const users = this.userService._users();
    this.users.set(users);
  }
}
