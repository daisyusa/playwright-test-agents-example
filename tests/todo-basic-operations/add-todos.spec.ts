import { test, expect } from '@playwright/test';

test.describe('Todo item operations', () => {
  test('Add todo items and update remaining count', async ({ page }) => {
    // Start with a fresh blank app and add the first todo.
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.locator('input.new-todo').fill('Buy groceries');
    await page.locator('input.new-todo').press('Enter');
    await expect(page.getByRole('listitem').filter({ hasText: 'Buy groceries' })).toBeVisible();
    await expect(page.locator('.todo-count')).toContainText('1');

    // Add the second todo and verify both items and the updated count.
    await page.locator('input.new-todo').fill('Walk the dog');
    await page.locator('input.new-todo').press('Enter');
    await expect(page.getByRole('listitem').filter({ hasText: 'Walk the dog' })).toBeVisible();
    await expect(page.locator('.todo-count')).toContainText('2');

    // Submit whitespace-only text and verify it does not add an item.
    await page.locator('input.new-todo').fill('   ');
    await page.locator('input.new-todo').press('Enter');
    await expect(page.getByRole('list').first().getByRole('listitem')).toHaveCount(2);
    await expect(page.locator('.todo-count')).toContainText('2');
  });
});
