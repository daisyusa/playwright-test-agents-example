import { test, expect } from '@playwright/test';

test.describe('Todo item operations', () => {
  test('Filter todos by all, active, and completed status', async ({ page }) => {
    // Start fresh, add three todos, and complete exactly one.
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const newTodo = page.locator('input.new-todo');
    await newTodo.fill('One completed');
    await newTodo.press('Enter');
    await newTodo.fill('Active item two');
    await newTodo.press('Enter');
    await newTodo.fill('Active item three');
    await newTodo.press('Enter');
    await page.getByRole('listitem').filter({ hasText: 'One completed' }).getByLabel('Toggle Todo').click();

    // Verify All shows all items and two remain active.
    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - list:
        - listitem: "One completed"
        - listitem: "Active item two"
        - listitem: "Active item three"
    `);
    await expect(page.locator('.todo-count')).toContainText('2');

    // Select Active and verify only the two active items are listed.
    await page.locator('a[href="#/active"]').click();
    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - list:
        - listitem: "Active item two"
        - listitem: "Active item three"
    `);
    await expect(page.locator('.todo-count')).toContainText('2');

    // Select Completed and verify only the completed item is listed.
    await page.locator('a[href="#/completed"]').click();
    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - list:
        - listitem: "One completed"
    `);

    // Return to All and verify all items and their completion states are preserved.
    await page.locator('a[href="#/"]').click();
    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - list:
        - listitem: "One completed"
        - listitem: "Active item two"
        - listitem: "Active item three"
    `);
    await expect(page.locator('input.toggle').first()).toBeChecked();
    await expect(page.locator('input.toggle').nth(1)).not.toBeChecked();
  });
});
