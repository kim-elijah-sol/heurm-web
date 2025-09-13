import { render, screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Panel } from '~/shared/ui';

describe('cta-button', () => {
  test('children 을 정상적으로 렌더링 할 수 있다.', () => {
    render(() => (
      <Panel.CTAButton data-testid='test' color={() => 'blue'}>
        Hello World
      </Panel.CTAButton>
    ));

    const component = screen.getByTestId('test');

    expect(component).toHaveTextContent('Hello World');
  });

  test('click 이벤트를 정상적으로 처리할 수 있다. [onClick]', async () => {
    const click = vi.fn();

    render(() => (
      <Panel.CTAButton data-testid='test' color={() => 'blue'} onClick={click}>
        Hello World
      </Panel.CTAButton>
    ));

    const component = screen.getByTestId('test');

    await userEvent.click(component);

    expect(click).toBeCalled();
  });

  test('click 이벤트를 정상적으로 처리할 수 있다. [on:click]', async () => {
    const click = vi.fn();

    render(() => (
      <Panel.CTAButton data-testid='test' color={() => 'blue'} on:click={click}>
        Hello World
      </Panel.CTAButton>
    ));

    const component = screen.getByTestId('test');

    await userEvent.click(component);

    expect(click).toBeCalled();
  });

  test('disabled 를 정상적으로 처리할 수 있다.', async () => {
    const click = vi.fn();

    render(() => (
      <Panel.CTAButton
        data-testid='test'
        disabled
        color={() => 'blue'}
        onClick={click}
      >
        Hello World
      </Panel.CTAButton>
    ));

    const component = screen.getByTestId('test');

    await userEvent.click(component);

    expect(click).not.toBeCalled();
  });
});
