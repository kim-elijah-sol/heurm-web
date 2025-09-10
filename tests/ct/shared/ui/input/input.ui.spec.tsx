import { render, screen } from '@solidjs/testing-library';
import user from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { Input } from '~/shared/ui';

describe('input', () => {
  test('사용자 클릭 시 포커스가 이루어진다.', async () => {
    user.setup();
    render(() => <Input data-testid='input' />);

    const component = screen.getByTestId('input');

    await user.click(component);

    expect(component).toHaveFocus();
  });

  test('사용자의 키보드 입력을 정상적으로 처리할 수 있다.', async () => {
    user.setup();
    render(() => <Input data-testid='input' />);

    const component = screen.getByTestId('input');

    await user.click(component);

    await user.keyboard('Test');

    expect(component).toHaveValue('Test');
  });
});
