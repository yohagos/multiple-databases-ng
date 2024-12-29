import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<Theme>('light')
  private _document = inject(DOCUMENT)

  constructor() {
    effect(() => {
      if (this.theme() === 'light') {
        this._document.documentElement.classList.add('light')
        this._document.documentElement.classList.remove('dark')
      } else {
        this._document.documentElement.classList.remove('light')
        this._document.documentElement.classList.add('dark')
      }
    })
  }

  toggleTheme() {
    this.theme.update((value) => {
      return value === 'dark' ? 'light' : 'dark'
    })
  }

  /* private renderer: Renderer2
  private colorScheme!: string
  private colorSchemePrefix = 'color-scheme-'

  private themeSubject: BehaviorSubject<string> = new BehaviorSubject('')
  themeValue = this.themeSubject.asObservable()

  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
    this._setColorSubject('')
  }

  _detectPrefersColorSchema() {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      this.colorScheme = 'dark'
    }
  }

  _setColorScheme(scheme: string) {
    this.colorScheme = scheme
    this._setColorSubject(scheme)
    localStorage.setItem('prefers-color', scheme)
  }

  _setColorSubject(scheme: string) {
    if (scheme == undefined || scheme === '') {
      scheme = 'dark'
    }
    this.themeSubject.next(scheme)
  }

  _getColorSubject() {
    return this.themeValue
  }

  _getColorScheme() {
    const localStorageColorScheme = localStorage.getItem('prefers-color')
    if (localStorageColorScheme) {
      this.colorScheme = localStorageColorScheme
    } else {
      this._detectPrefersColorSchema()
    }
  }

  loadTheme() {
    this.renderer.addClass(document.body, 'mat-app-background')
    this._getColorScheme()
    this.renderer.addClass(document.body, this.colorSchemePrefix + this.colorScheme)
  }

  update(scheme: string) {
    this._setColorScheme(scheme)
    this._setColorSubject(scheme)
    this.renderer.removeClass(document.body, this.colorSchemePrefix + (this.colorScheme === 'dark' ? 'light': 'dark'))
    this.renderer.addClass(document.body, this.colorSchemePrefix + scheme);
  }

  currentActive() {
    return this.colorScheme
  } */
}
