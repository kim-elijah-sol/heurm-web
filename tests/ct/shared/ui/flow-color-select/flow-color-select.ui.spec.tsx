import { render, screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { expect } from 'playwright/test';
import { createSignal } from 'solid-js';
import { describe, test } from 'vitest';
import { FlowColor } from '~/shared/types';
import { FlowColorSelect } from '~/shared/ui';

describe('flow-color-select', () => {
  test('초기 색상이 선택되어 있다.', async () => {
    render(() => <FlowColorSelect color={() => 'blue'} setColor={() => {}} />);

    const blueButton = screen.getByTestId('color-item-blue');

    expect(blueButton.children.length).toBe(1);

    const redButton = screen.getByTestId('color-item-red');

    expect(redButton.children.length).toBe(0);
  });

  test('사용자 클릭을 정상적으로 처리할 수 있다.', async () => {
    const [color, setColor] = createSignal<FlowColor>('blue');

    render(() => <FlowColorSelect color={color} setColor={setColor} />);

    const redButton = screen.getByTestId('color-item-red');

    await userEvent.click(redButton);

    expect(redButton.children.length).toBe(1);

    expect(color()).toBe('red');
  });

  test('사용자 지정 className 을 컨테이너에 정상적으로 적용할 수 있다.', () => {
    render(() => (
      <FlowColorSelect
        color={() => 'blue'}
        setColor={() => {}}
        className='test-className'
      />
    ));

    const component = screen.getByTestId('flow-color-select');

    expect(component.className).toContain('test-className');
  });
});
