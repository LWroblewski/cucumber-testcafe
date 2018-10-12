import { InjectionToken } from '@angular/core';

export interface AppConfiguration {
    production: boolean;
    urlUsers: string;
    urlMarkets: string;
    urlOrders: string;
}

export const APP_CONFIGURATION = new InjectionToken<AppConfiguration>('APP_CONFIGURATION');
