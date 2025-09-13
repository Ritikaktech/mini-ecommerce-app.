import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'mini-ecom-app';
}
