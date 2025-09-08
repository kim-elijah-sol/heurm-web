import { beforeEach, describe, expect, test, vi } from 'vitest';
import { STORAGE_KEYS } from '~/shared/constant';
import { removeTokens } from '~/shared/fx';

describe('remove-tokens', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => (store[key] = value)),
      removeItem: vi.fn((key) => delete store[key]),
    };
  })();

  beforeEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, 'access-token');
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, 'refresh-token');
    localStorage.setItem(STORAGE_KEYS.CLIENT_ID, 'client-id');
  });

  test('회원 인증 정보를 모두 초기화 할 수 있다.', () => {
    removeTokens();

    expect(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)).toBe(null);
    expect(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)).toBe(null);
    expect(localStorage.getItem(STORAGE_KEYS.CLIENT_ID)).toBe(null);

    expect(localStorage.removeItem).toBeCalledTimes(3);
  });
});
