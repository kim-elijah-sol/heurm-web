import { describe, expect, test } from 'vitest';
import { dateFormat } from '~/shared/fx';

describe('date-format.yyyy-MM-dd', () => {
  test('string 데이터를 yyyy-MM-dd 로 변환할 수 있다.', () => {
    expect(dateFormat['yyyy-MM-dd']('2025.1.2')).toBe('2025-01-02');
  });

  test('number 데이터를 yyyy-MM-dd 로 변환할 수 있다.', () => {
    expect(dateFormat['yyyy-MM-dd'](1_735_776_000_000)).toBe('2025-01-02');
  });

  test('Date 데이터를 yyyy-MM-dd 로 변환할 수 있다.', () => {
    expect(dateFormat['yyyy-MM-dd'](new Date('2025.1.2'))).toBe('2025-01-02');
  });

  test('yyyy-MM-dd 로 올바르지 않은 데이터 형식은 변환할 수 없다. [날짜 형식이 아님]', () => {
    expect(() => dateFormat['yyyy-MM-dd'](new Date('test'))).toThrow(
      'Invalid time value'
    );
  });

  test('yyyy-MM-dd 로 올바르지 않은 데이터 형식은 변환할 수 없다. [존재하지 않는 날짜]', () => {
    expect(() => dateFormat['yyyy-MM-dd'](new Date('2025.15.38'))).toThrow(
      'Invalid time value'
    );
  });
});

describe('date-format.yyyy.MM.dd', () => {
  test('string 데이터를 yyyy.MM.dd 로 변환할 수 있다.', () => {
    expect(dateFormat['yyyy.MM.dd']('2025-1-2')).toBe('2025.01.02');
  });

  test('number 데이터를 yyyy.MM.dd 로 변환할 수 있다.', () => {
    expect(dateFormat['yyyy.MM.dd'](1_735_776_000_000)).toBe('2025.01.02');
  });

  test('Date 데이터를 yyyy.MM.dd 로 변환할 수 있다.', () => {
    expect(dateFormat['yyyy.MM.dd'](new Date('2025-1-2'))).toBe('2025.01.02');
  });

  test('yyyy.MM.dd 로 올바르지 않은 데이터 형식은 변환할 수 없다. [날짜 형식이 아님]', () => {
    expect(() => dateFormat['yyyy.MM.dd'](new Date('test'))).toThrow(
      'Invalid time value'
    );
  });

  test('yyyy.MM.dd 로 올바르지 않은 데이터 형식은 변환할 수 없다. [존재하지 않는 날짜]', () => {
    expect(() => dateFormat['yyyy.MM.dd'](new Date('2025-15-38'))).toThrow(
      'Invalid time value'
    );
  });
});
