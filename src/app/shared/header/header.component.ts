import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterModule } from '@angular/router';
import { KeycloakService } from '../../core/services/keycloak/keycloak.service';
import { ThemeService } from '../../core/services/themes/theme.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MenuconfigService, MenuItem } from './menuconfig.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private _themeService = inject(ThemeService)
  private _keycloakService = inject(KeycloakService)
  private _router = inject(Router)
  private _menuConfigService = inject(MenuconfigService)

  menuItems: MenuItem[] = []

  ngOnInit() {
    this._router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.menuItems = this._menuConfigService.getMenuItems(events.url)
      }
    })
  }

  switchTheme() {
    this._themeService.toggleTheme()
  }

  logout() {
    this._keycloakService.logout()
  }
}
