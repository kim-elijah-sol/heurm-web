import { AxiosError } from 'axios';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { z } from 'zod';
import { ADD_TOAST_EVENT_NAME, DEFAULT_ERROR_MESSAGE } from '~/shared/constant';
import { toastAtError } from '~/shared/fx';

describe('toast-at-error', () => {
  // toast.open 에서 사용하는 window.dispatchEvent mocking
  beforeEach(() => {
    vi.stubGlobal(
      'dispatchEvent',
      vi.fn(() => {})
    );
  });

  test('zod 에러가 반환되었을 때 zod 에러 문구를 toast 로 노출한다.', () => {
    const validator = z.string().min(2, { message: '2글자 이상 입력' });

    try {
      validator.parse('H');
    } catch (error) {
      return toastAtError(error);
    }

    const event = new CustomEvent(ADD_TOAST_EVENT_NAME, {
      detail: { text: '2글자 이상 입력' },
    });

    expect(dispatchEvent).toBeCalledWith(event);
  });

  test('server error 문구가 포함된 axios 에러가 반환되었을 때 server error 문구를 toast 로 노출한다.', () => {
    const axiosError: AxiosError = {
      isAxiosError: true,
      response: {
        data: 'Internal Server Error',
      },
    } as AxiosError;

    toastAtError(axiosError);

    const event = new CustomEvent(ADD_TOAST_EVENT_NAME, {
      detail: { text: 'Internal Server Error' },
    });

    expect(dispatchEvent).toBeCalledWith(event);
  });

  test('server error 문구가 없는 axios 에러가 반환되었을 때 기본 에러 문구를 toast 로 노출한다.', () => {
    const axiosError: AxiosError = {
      isAxiosError: true,
      response: {},
    } as AxiosError;

    toastAtError(axiosError);

    const event = new CustomEvent(ADD_TOAST_EVENT_NAME, {
      detail: { text: DEFAULT_ERROR_MESSAGE },
    });

    expect(dispatchEvent).toBeCalledWith(event);
  });

  test('이외 모든 오류는 기본 에러 문구를 toast 로 노출한다.', () => {
    toastAtError(new Error());

    const event = new CustomEvent(ADD_TOAST_EVENT_NAME, {
      detail: { text: DEFAULT_ERROR_MESSAGE },
    });

    expect(dispatchEvent).toBeCalledWith(event);
  });

  test('chaining 옵션을 활성화 시키면 해당 오류를 다시 throw 한다.', () => {
    expect(() =>
      toastAtError(new Error('Test Error'), { chaining: true })
    ).toThrow('Test Error');

    const event = new CustomEvent(ADD_TOAST_EVENT_NAME, {
      detail: { text: DEFAULT_ERROR_MESSAGE },
    });

    expect(dispatchEvent).toBeCalledWith(event);
  });
});
