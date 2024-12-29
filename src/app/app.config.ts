import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';
import { provideMarkdown } from "ngx-markdown";
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakService } from './core/services/keycloak/keycloak.service';
import { httptokenInterceptor } from './core/interceptor/httptoken.interceptor';
import { FormatdateService } from './shared/services/formatdate.service';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init()
}

export function localeFactory( dateService: FormatdateService) {
  return () => dateService.init()
}

const providers = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [FormatdateService],
      useFactory: localeFactory,
      multi: true
    },
    provideMarkdown(),
    provideHttpClient(withInterceptors([httptokenInterceptor])),
    importProvidersFrom(providers),
  ]
};

