import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), importProvidersFrom(
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: true,
      preventDuplicates: true,
    })
  ),]
};
