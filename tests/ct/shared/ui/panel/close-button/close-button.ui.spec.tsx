import { render, screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Panel } from '~/shared/ui';

describe('close-button', () => {
  test('close 이벤트를 정상적으로 처리할 수 있다.', async () => {
    const click = vi.fn();

    render(() => <Panel.CloseButton onClick={click} />);

    const component = screen.getByTestId('panel-close-button');

    await userEvent.click(component);

    expect(click).toBeCalled();
  });
});
