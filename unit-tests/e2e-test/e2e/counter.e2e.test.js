import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('should display initial counter value of 0', async ({ page }) => {
  const counter = page.getByTestId('counter-display');
  await expect(counter).toHaveText('0');
});

test('should increment counter when button is clicked', async ({ page }) => {
  const counter = page.getByTestId('counter-display');
  const incrementBtn = page.getByTestId('increment-btn');

  await incrementBtn.click();
  await expect(counter).toHaveText('1');

  await incrementBtn.click();
  await expect(counter).toHaveText('2');

  await incrementBtn.click();
  await expect(counter).toHaveText('3');
});