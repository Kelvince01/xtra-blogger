import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

/**
 * Provides base providers
 * @description this is a factory function
 * @see MAT_SNACK_BAR_DEFAULT_OPTIONS
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const provideBaseProviders = () => {
  return [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } }];
};
