import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

type HomeOverview = {
  title: string;
  description: string;
  component: string;
  icon: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private _router = inject(Router)


  overview: HomeOverview[] = [
    {
      title: 'Dashboard',
      description: 'Overview of your databases',
      component: 'dashboard',
      icon: 'bar_chart'
    },
    {
      title: 'Ticketsystem',
      description: 'Ticket App',
      component: 'tickets',
      icon: 'task'
    },
    {
      title: 'User Management',
      description: 'Manage User Roles and Access',
      component: 'users',
      icon: 'person'
    },
  ]

  route(component: string) {
    this._router.navigate([`/${component}`])
  }

}
