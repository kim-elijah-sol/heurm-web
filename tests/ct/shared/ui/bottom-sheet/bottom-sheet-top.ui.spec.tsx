import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, test, vi } from 'vitest';
import { BottomSheet } from '~/shared/ui';

describe('bottom-sheet-top', () => {
  test('BottomSheet.Top > children 이 정상적으로 렌더링된다.', () => {
    const result = render(() => (
      <BottomSheet.Top>Hello World!</BottomSheet.Top>
    ));

    const component = result.getByTestId('bottom-sheet-top');

    expect(component).toHaveTextContent('Hello World!');
  });

  test('BottomSheet.Top > className 이 정상적으로 렌더링된다.', () => {
    render(() => (
      <BottomSheet.Top className='test'>Hello World!</BottomSheet.Top>
    ));

    const component = screen.getByTestId('bottom-sheet-top');

    expect(component.className).toContain('test');
  });

  test('BottomSheet.Top.Title > children 이 정상적으로 렌더링된다.', () => {
    render(() => <BottomSheet.Top.Title>Hello World!</BottomSheet.Top.Title>);

    const component = screen.getByTestId('bottom-sheet-top-title');

    expect(component).toHaveTextContent('Hello World!');
  });

  test('BottomSheet.Top.CloseButton > BottomSheet 의 close 함수를 처리한다.', () => {
    vi.useFakeTimers();

    const close = vi.fn();

    render(() => (
      <BottomSheet close={close}>
        {() => <BottomSheet.Top.CloseButton />}
      </BottomSheet>
    ));

    const button = screen.getByTestId('bottom-sheet-top-close-button');

    fireEvent.click(button);

    expect(close).not.toBeCalled();

    vi.advanceTimersByTime(300);

    expect(close).toBeCalled();

    vi.useRealTimers();
  });
});
