import { Component, inject, signal } from '@angular/core';
import {RouterLinkWithHref, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterLinkWithHref],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('Dynamic Form Home Page');  
}
