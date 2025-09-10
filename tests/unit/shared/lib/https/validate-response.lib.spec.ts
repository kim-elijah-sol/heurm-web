import { AxiosResponse } from 'axios';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { validateResponse } from '~/shared/lib/https/validate-response.lib';

const schema = z.object({
  name: z.string(),
  born: z.number(),
  job: z.enum(['engineer', 'product owner', 'product designer']).optional(),
});

describe('validate-response', () => {
  test('응답 값이 스키마에 적합하다면 response.data 를 반환한다.', () => {
    const response = {
      data: {
        name: 'sol.kim',
        born: 1999,
      },
    } as unknown as AxiosResponse;

    expect(validateResponse(schema)(response)).toEqual({
      name: 'sol.kim',
      born: 1999,
    });
  });

  test('응답 값이 스키마에 적합하지 않다면 zod error 를 throw 한다.', () => {
    const response = {
      data: {
        name: 'sol.kim',
        born: 1999,
        job: 'cto',
      },
    } as unknown as AxiosResponse;

    expect(() => validateResponse(schema)(response)).toThrow();
  });
});
