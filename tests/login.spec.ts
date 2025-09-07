import test, { expect } from 'playwright/test';

test.describe('로그인 페이지 테스트', () => {
  test('로그인 페이지 진입 시 입력 폼이 노출된다.', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('input[type="email"]')).toBeInViewport();
    await expect(page.locator('input[type="password"]')).toBeInViewport();
    await expect(page.locator('button[type="submit"]')).toBeInViewport();
  });

  test('모든 폼에 입력이 이루어지지 않으면 로그인 버튼은 비활성화 상태이다. [이메일 미입력]', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.locator('input[type="password"]').fill('TestPassword');

    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  test('모든 폼에 입력이 이루어지지 않으면 로그인 버튼은 비활성화 상태이다. [비밀번호 미입력]', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.locator('input[type="email"]').fill('kimelijahsol');

    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  test('모든 폼에 입력이 이루어지면 로그인 버튼은 활성화 상태이다.', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.locator('input[type="email"]').fill('kimelijahsol');
    await page.locator('input[type="password"]').fill('TestPassword');

    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('이메일 형식이 아닌 경우 로그인 시도 시 실패 토스트가 나온다.', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.locator('input[type="email"]').fill('kimelijahsol@a.c');
    await page.locator('input[type="password"]').fill('TestPassword');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('.toast')).toHaveText(
      'Please enter a valid email address'
    );
  });

  test('비밀번호 형식이 아닌 경우 로그인 시도 시 실패 토스트가 나온다. [8자 미만]', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.locator('input[type="email"]').fill('kimelijahsol@test.com');
    await page.locator('input[type="password"]').fill('testpas');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('.toast')).toHaveText(
      'Password must be at least 8 characters long'
    );
  });

  test('비밀번호 형식이 아닌 경우 로그인 시도 시 실패 토스트가 나온다. [16자 초과]', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.locator('input[type="email"]').fill('kimelijahsol@test.com');
    await page.locator('input[type="password"]').fill('testpasswordtest!');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('.toast')).toHaveText(
      'Password must be at most 16 characters long'
    );
  });
});
