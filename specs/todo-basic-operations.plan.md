# TodoMVC Basic Operations Test Plan

## Application Overview

Functional coverage for the TodoMVC demo at https://demo.playwright.dev/todomvc/#/, based on exploration of its add form, task list, completion controls, inline editing, filters, item count, and clear-completed action. Every scenario starts from a fresh/blank app state; clear app data or open a clean browser context before each test.

## Test Scenarios

### 1. Todo item operations

**Seed:** `seed.spec.ts`

#### 1.1. Add todo items and update remaining count

**File:** `tests/todo-basic-operations/add-todos.spec.ts`

**Steps:**
  1. Start with a fresh blank app. Enter “Buy groceries” in the “What needs to be done?” field and press Enter.
    - expect: A todo named “Buy groceries” appears in the list.
    - expect: The remaining count shows 1 item left.
  2. Enter “Walk the dog” and press Enter.
    - expect: Both todos appear in the list in the order added.
    - expect: The remaining count shows 2 items left.
  3. Submit whitespace-only text with Enter.
    - expect: No blank todo is added and the count remains 2.

#### 1.2. Toggle an individual todo and mark all complete

**File:** `tests/todo-basic-operations/toggle-todos.spec.ts`

**Steps:**
  1. Start fresh and add three distinct todos.
    - expect: All three todos are visible and the remaining count is 3.
  2. Toggle the first todo's completion checkbox.
    - expect: The first todo is visibly completed; the other two remain active.
    - expect: The remaining count decreases to 2.
  3. Toggle the first todo again.
    - expect: The first todo returns to active and the remaining count returns to 3.
  4. Use the “Mark all as complete” checkbox.
    - expect: All three todos become completed and the remaining count is 0.
    - expect: The bulk checkbox reflects the completed state.
  5. Toggle the bulk checkbox again.
    - expect: All three todos become active and the remaining count is 3.

#### 1.3. Edit a todo and handle an empty edit

**File:** `tests/todo-basic-operations/edit-todo.spec.ts`

**Steps:**
  1. Start fresh and add “Walk the dog”. Double-click its text.
    - expect: An inline edit textbox appears with the existing title.
  2. Replace the title with “Walk the puppy” and press Enter.
    - expect: The updated title is shown in the list and the original title is absent.
    - expect: The remaining count is unchanged at 1.
  3. Double-click the updated title, clear the edit textbox, and press Enter.
    - expect: The item is removed when an empty title is submitted.
    - expect: The list is empty and the remaining count is 0.

#### 1.4. Delete an individual todo

**File:** `tests/todo-basic-operations/delete-todo.spec.ts`

**Steps:**
  1. Start fresh and add “Buy groceries” and “Read a book”.
    - expect: Two active todos appear and the remaining count is 2.
  2. Reveal the delete control for “Buy groceries” and activate it.
    - expect: “Buy groceries” is removed while “Read a book” remains.
    - expect: The remaining count changes to 1.

#### 1.5. Filter todos by all, active, and completed status

**File:** `tests/todo-basic-operations/filter-todos.spec.ts`

**Steps:**
  1. Start fresh and add three todos; complete exactly one.
    - expect: The All view shows all three items and the count shows 2 remaining.
  2. Select the Active filter.
    - expect: Only the two active todos are listed.
    - expect: The remaining count is 2.
  3. Select the Completed filter.
    - expect: Only the completed todo is listed.
  4. Select All.
    - expect: All three todos are visible again with their completion states preserved.

#### 1.6. Clear completed todos without removing active items

**File:** `tests/todo-basic-operations/clear-completed.spec.ts`

**Steps:**
  1. Start fresh and add three todos; complete two of them.
    - expect: The list contains two completed todos and one active todo.
    - expect: The remaining count is 1.
  2. Activate “Clear completed”.
    - expect: Both completed todos are removed.
    - expect: The active todo remains and the remaining count is 1.
  3. Complete the remaining todo and activate “Clear completed” again.
    - expect: The list becomes empty and the remaining count is 0.
