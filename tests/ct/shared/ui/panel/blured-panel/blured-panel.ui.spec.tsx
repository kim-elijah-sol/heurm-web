import { fireEvent, render, screen } from '@solidjs/testing-library';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { Panel } from '~/shared/ui';

describe('blured-panel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('children 이 정상적으로 렌더링 된다.', () => {
    render(() => (
      <Panel.Blured close={() => {}}>
        {() => <div data-testid='test'>Hello world!</div>}
      </Panel.Blured>
    ));

    const children = screen.getByTestId('test');

    expect(children).toBeVisible();

    expect(children).toHaveTextContent('Hello world');
  });

  test('close 함수가 transition 이후 정상적으로 호출된다.', () => {
    const close = vi.fn();

    render(() => (
      <Panel.Blured close={close}>
        {(close) => <button data-testid='test' on:click={close} />}
      </Panel.Blured>
    ));

    const button = screen.getByTestId('test');

    fireEvent.click(button);

    expect(close).not.toBeCalled();

    vi.advanceTimersByTime(300);

    expect(close).toBeCalled();
  });

  test('배경을 클릭하면 close 함수가 transition 이후 정상적으로 호출된다.', () => {
    const close = vi.fn();

    render(() => <Panel.Blured close={close}>{() => <></>}</Panel.Blured>);

    const background = screen.getByTestId('heurm-blured-panel-bg');

    fireEvent.click(background);

    expect(close).not.toBeCalled();

    vi.advanceTimersByTime(300);

    expect(close).toBeCalled();
  });

  test('autoClose 를 비활성화 시키면 배경을 클릭해도 close 함수가 실행되지 않는다..', () => {
    const close = vi.fn();

    render(() => (
      <Panel.Blured autoClose={false} close={close}>
        {() => <></>}
      </Panel.Blured>
    ));

    const background = screen.getByTestId('heurm-blured-panel-bg');

    fireEvent.click(background);

    expect(close).not.toBeCalled();

    vi.advanceTimersByTime(300);

    expect(close).not.toBeCalled();
  });
});
