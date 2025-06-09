import { https as _https } from './https.lib';
import { validateResponse } from './validate-response.lib';

export const https = Object.assign(_https, {
  validateResponse,
});
