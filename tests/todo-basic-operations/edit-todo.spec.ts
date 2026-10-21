import { test, expect } from '@playwright/test';

test.describe('Todo item operations', () => {
  test('Edit a todo and handle an empty edit', async ({ page }) => {
    // Start fresh and add a todo to edit.
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const newTodo = page.locator('input.new-todo');
    await newTodo.fill('Walk the dog');
    await newTodo.press('Enter');

    // Open the inline editor, rename the todo, and save it.
    await page.getByRole('listitem').filter({ hasText: 'Walk the dog' }).dblclick();
    const editInput = page.getByRole('textbox', { name: 'Edit' });
    await editInput.fill('Walk the puppy');
    await editInput.press('Enter');
    await expect(page.getByRole('listitem').filter({ hasText: 'Walk the puppy' })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'Walk the dog' })).toHaveCount(0);
    await expect(page.locator('.todo-count')).toContainText('1');

    // Clear the edited title and submit it to remove the todo.
    await page.getByRole('listitem').filter({ hasText: 'Walk the puppy' }).dblclick();
    await editInput.fill('');
    await editInput.press('Enter');
    await expect(page.getByRole('listitem')).toHaveCount(0);
  });
});
