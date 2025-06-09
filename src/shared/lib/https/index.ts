import { https as _https } from './https.lib';
import { validateResponse } from './validateResponse.lib';

export const https = Object.assign(_https, {
  validateResponse,
});
