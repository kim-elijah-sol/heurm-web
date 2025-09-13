import { fireEvent, render, screen } from '@solidjs/testing-library';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { Panel } from '~/shared/ui';

describe('slide-panel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('children 이 정상적으로 렌더링 된다.', () => {
    render(() => (
      <Panel.Slide close={() => {}}>
        {() => <div data-testid='test'>Hello world!</div>}
      </Panel.Slide>
    ));

    const children = screen.getByTestId('test');

    expect(children).toBeVisible();

    expect(children).toHaveTextContent('Hello world');
  });

  test('close 함수가 transition 이후 정상적으로 호출된다.', () => {
    const close = vi.fn();

    render(() => (
      <Panel.Slide close={close}>
        {(close) => <button data-testid='test' on:click={close} />}
      </Panel.Slide>
    ));

    const button = screen.getByTestId('test');

    fireEvent.click(button);

    expect(close).not.toBeCalled();

    vi.advanceTimersByTime(300);

    expect(close).toBeCalled();
  });
});
