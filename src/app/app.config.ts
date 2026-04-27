import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { BrDateAdapter } from '@/app/shared/date/br-date-adapter';
import { BR_DATE_FORMATS } from '@/app/shared/date/date-formats';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNgxMask(),
    provideHttpClient(withFetch()),
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: BrDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: BR_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
};
