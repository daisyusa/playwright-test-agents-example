import { test, expect } from '@playwright/test';

test.describe('Todo item operations', () => {
  test('Clear completed todos without removing active items', async ({ page }) => {
    // Start fresh and add three todos.
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const newTodo = page.locator('input.new-todo');
    await newTodo.fill('Clear A');
    await newTodo.press('Enter');
    await newTodo.fill('Clear B');
    await newTodo.press('Enter');
    await newTodo.fill('Keep active');
    await newTodo.press('Enter');

    // Complete two todos and clear the completed items.
    await page.getByRole('listitem').filter({ hasText: 'Clear A' }).getByLabel('Toggle Todo').click();
    await page.getByRole('listitem').filter({ hasText: 'Clear B' }).getByLabel('Toggle Todo').click();
    await page.getByRole('button', { name: 'Clear completed' }).click();

    // Verify the active item remains and the count is one.
    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - list:
        - listitem: "Keep active"
    `);
    await expect(page.locator('.todo-count')).toContainText('1');

    // Complete the remaining todo and clear completed items again.
    await page.getByRole('listitem').filter({ hasText: 'Keep active' }).getByLabel('Toggle Todo').click();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(page.getByRole('listitem')).toHaveCount(0);
  });
});
