import { describe, expect, test } from 'vitest';
import { isNavigationHide } from '~/features/layout/fx';

describe('is-navigation-hide', () => {
  test('로그인 페이지라면 navigation 이 렌더링되지 않는다.', () => {
    expect(isNavigationHide('/login')).toBe(true);
  });

  test('이외 페이지는 navigation 이 렌더링 된다.', () => {
    expect(isNavigationHide('/')).toBe(false);
  });
});
