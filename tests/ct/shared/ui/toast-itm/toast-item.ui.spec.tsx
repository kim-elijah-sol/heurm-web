import { render } from '@solidjs/testing-library';
import { describe, expect, test } from 'vitest';
import { ToastItem } from '~/shared/ui';

describe('toast-item', () => {
  test('text 가 정상적으로 렌더링된다.', () => {
    const result = render(() => <ToastItem text='hello world!' />);

    const toastItem = result.container.querySelector('.toast');

    expect(toastItem).toHaveTextContent('hello world!');
  });

  test('html 형태로 정상적으로 렌더링된다.', () => {
    const result = render(() => <ToastItem text='hello <br />world!' />);

    const toastItem = result.container.querySelector('.toast')!;

    expect(toastItem).toHaveTextContent('hello world!');

    const br = toastItem.querySelector('br');

    expect(br).toBeVisible();
  });
});
