import { Component, inject, OnInit, signal} from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { UserDto } from '../../domains/user.dto';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-root',
  imports: [RouterLinkWithHref],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private router = inject(Router);
  private alertService = inject(AlertService);
  private userService = inject(UserService);

  public users = signal<UserDto[]>([]);
  protected readonly title = signal('All Users');

  ngOnInit() {
    this.getUsers();
  }

  public deleteUser(event: Event) {
    const button = event.target as HTMLButtonElement;
    const id = Number(button.dataset['id']);

    this.userService.deleteUser(id).subscribe(response => {
      this.alertService.sendMessage(response.message, true);
      this.users.update(users => users.filter(user => user.id !== id));
    });
  }
  
  private getUsers() {
    this.userService.getUsers()
    .subscribe((users: UserDto[]) => {
      this.users.set(users);
    })
  }
}
