import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, HttpClientModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
