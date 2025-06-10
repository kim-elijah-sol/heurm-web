import { type AxiosResponse } from 'axios';
import { type ZodType } from 'zod';

export const validateResponse =
  <Z extends ZodType<any, any>>(zodSchema: Z) =>
  <T>(response: AxiosResponse<T>): T => {
    const parseResult = zodSchema.safeParse(response.data);

    if (parseResult.success === false) {
      throw parseResult.error;
    }

    return response.data;
  };
