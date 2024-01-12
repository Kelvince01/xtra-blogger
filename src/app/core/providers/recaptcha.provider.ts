/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../../../environments/environment.development';

/**
 * Provides an interceptor to handle errors
 * @description this is a factory function
 * @see ErrorIntercept
 */
export const provideRecaptcha = () => {
  return {
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.recaptchaKey
    } as RecaptchaSettings
  };
};
