import { Injectable } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

export interface MenuItem {
  label: string
  icon?: string
  routerLink: string
}

interface MenuConfig {
  [routerPath: string]: MenuItem[]
}

@Injectable({
  providedIn: 'root'
})
export class MenuconfigService {
  private _menuConfig: MenuConfig = {
    '/home': [

    ],
    '/tickets': [
      {label: 'Home', icon: 'home', routerLink: '/home'},
      {label: 'Projects', icon: 'handshake', routerLink: '/projects'},
    ],
    '/tickets/ticket/.*': [
      {label: 'Home', icon: 'home', routerLink: '/home'},
      {label: 'Tickets', icon: 'mail', routerLink: '/tickets'},
      {label: 'Projects', icon: 'handshake', routerLink: '/projects'},
    ],
    '/projects': [
      {label: 'Home', icon: 'home', routerLink: '/home'},
      {label: 'Tickets', icon: 'mail', routerLink: '/tickets'},
      {label: 'User Management', icon: 'group', routerLink: '/users'},
      {label: 'Dashboard', icon: 'analytics', routerLink: '/dashboard'}
    ],
    '/dashboard': [
      {label: 'Home', icon: 'home', routerLink: '/home'},
      {label: 'Tickets', icon: 'mail', routerLink: '/tickets'},
      {label: 'Projects', icon: 'handshake', routerLink: '/projects'},
      {label: 'User Management', icon: 'group', routerLink: '/users'},
    ],
    '/users': [
      {label: 'Home', icon: 'home', routerLink: '/home'},
      {label: 'Tickets', icon: 'mail', routerLink: '/tickets'},
      {label: 'Projects', icon: 'handshake', routerLink: '/projects'},
      {label: 'Dashboard', icon: 'analytics', routerLink: '/dashboard'}
    ]
  }

  getMenuItems(route: string): MenuItem[] {
    const matchingKey = Object.keys(this._menuConfig).find(key => {
      if (key.includes('.*')) {
        const regex = new RegExp('^'+key+'$')
        return regex.test(route)
      }
      return key === route
    })
    return matchingKey ? this._menuConfig[matchingKey] : []
  }
}
