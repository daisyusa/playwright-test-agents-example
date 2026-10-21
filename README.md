# TodoMVC Playwright Tests

This project contains Playwright tests for basic operations in the TodoMVC demo at
<https://demo.playwright.dev/todomvc/>.

## About this repository

This repository is an example of using the three Playwright test agents described
in the [Playwright test agents documentation](https://playwright.dev/docs/test-agents). They are playwright-test-planner, generator and healer.
The agents were used to explore the TodoMVC interface, create a test plan, and
generate example Playwright test code from that plan. The prompts used in three steps are 1:Explore this Todo app interface, URL is https://demo.playwright.dev/todomvc/#/, create a test plan for basic operations. 2:Generate tests for all the sections. 3: Fix the test. Pay attention to the input file and agent are different in 3 phases. Planing phase you should select seed.spec.ts as input and playwright-test-planner as Agent; Generating phase you should select todo-basic-operations.plan.md as input file and playwright-test-generator as agent; Before Healing phase, you should run all the tests first and there is one case will be failed purposely for the demo. In the healing phase, select that failed case add-todos.spec.ts as input and select playwight-test-healer as agent.

## Test scenarios

The tests are in [`tests/todo-basic-operations/`](tests/todo-basic-operations/):

- `add-todos.spec.ts` — add todos and verify the remaining count, including whitespace-only input.
- `toggle-todos.spec.ts` — toggle one todo and mark all todos complete or active.
- `edit-todo.spec.ts` — rename a todo and remove it by saving an empty title.
- `delete-todo.spec.ts` — delete one todo while retaining another.
- `filter-todos.spec.ts` — filter by all, active, and completed status.
- `clear-completed.spec.ts` — clear completed todos while preserving active ones.

Each test opens the demo independently and creates its own todo data.

## Running the tests

Run the full Playwright suite:

```sh
npx playwright test
```

Run only the TodoMVC basic-operation tests:

```sh
npx playwright test tests/todo-basic-operations
```

To run the suite in Chromium:

```sh
npx playwright test tests/todo-basic-operations --project=chromium
```

The test plan is documented in [`specs/todo-basic-operations.plan.md`](specs/todo-basic-operations.plan.md).
