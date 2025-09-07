import { describe, expect, it, vi } from 'vitest';
import { delay } from '~/shared/fx';

describe('delay', () => {
  it('지정된 시간 후에 null을 반환한다', async () => {
    vi.useFakeTimers();

    const promise = delay(1000);
    vi.advanceTimersByTime(1000);

    await expect(promise).resolves.toBeNull();

    vi.useRealTimers();
  });
});
