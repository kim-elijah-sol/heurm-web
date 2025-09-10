import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ADD_TOAST_EVENT_NAME } from '~/shared/constant';
import { toast } from '~/shared/lib';

describe('toast.open', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'dispatchEvent',
      vi.fn(() => {})
    );
  });

  test('토스트 이벤트를 발송할 수 있다.', () => {
    toast.open('Test Message');

    const event = new CustomEvent(ADD_TOAST_EVENT_NAME, {
      detail: { text: 'Test Message' },
    });

    expect(dispatchEvent).toBeCalledWith(event);
  });
});
