import { test, expect } from '@playwright/test';

test.describe('Todo item operations', () => {
  test('Delete an individual todo', async ({ page }) => {
    // Start fresh and add two todos.
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const newTodo = page.locator('input.new-todo');
    await newTodo.fill('Buy groceries');
    await newTodo.press('Enter');
    await newTodo.fill('Read a book');
    await newTodo.press('Enter');

    // Reveal and activate the delete control for Buy groceries.
    const todoToDelete = page.getByRole('listitem').filter({ hasText: 'Buy groceries' });
    await todoToDelete.hover();
    await todoToDelete.getByRole('button', { name: 'Delete' }).click();

    // Verify Buy groceries is removed, Read a book remains, and the count is one.
    await expect(page.getByRole('listitem').filter({ hasText: 'Buy groceries' })).toHaveCount(0);
    await expect(page.getByRole('listitem').filter({ hasText: 'Read a book' })).toBeVisible();
    await expect(page.locator('.todo-count')).toContainText('1');
  });
});
