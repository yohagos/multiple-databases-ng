import { bootstrapApplication, DomSanitizer } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MatIconRegistry } from '@angular/material/icon';
import { ErrorHandler, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    provideCharts(withDefaultRegisterables()),
    ...appConfig.providers,
  ]
})
  .catch((err) => console.error(err));
