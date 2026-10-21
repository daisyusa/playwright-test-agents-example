import { test, expect } from '@playwright/test';

test.describe('Todo item operations', () => {
  test('Toggle an individual todo and mark all complete', async ({ page }) => {
    // Start fresh and add three distinct todos.
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const newTodo = page.locator('input.new-todo');
    await newTodo.fill('Alpha');
    await newTodo.press('Enter');
    await newTodo.fill('Beta');
    await newTodo.press('Enter');
    await newTodo.fill('Gamma');
    await newTodo.press('Enter');

    // Toggle the first todo complete and verify its state and remaining count.
    const firstTodoToggle = page.locator('input.toggle').first();
    await page.getByRole('listitem').filter({ hasText: 'Alpha' }).getByLabel('Toggle Todo').click();
    await expect(firstTodoToggle).toBeChecked();
    await expect(page.locator('.todo-count')).toContainText('2');

    // Toggle the first todo back to active and verify the count.
    await firstTodoToggle.click();
    await expect(firstTodoToggle).not.toBeChecked();
    await expect(page.locator('.todo-count')).toContainText('3');

    // Mark all todos complete and verify the bulk state and count.
    const toggleAll = page.locator('input.toggle-all');
    await toggleAll.click();
    await expect(toggleAll).toBeChecked();
    await expect(page.locator('.todo-count')).toContainText('0');

    // Toggle all todos back to active.
    await toggleAll.click();
    await expect(toggleAll).not.toBeChecked();
    await expect(page.locator('.todo-count')).toContainText('3');
  });
});
