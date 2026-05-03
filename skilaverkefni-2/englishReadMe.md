# Team Task Hub – Testing Assignment (skilaverkefni-2)

## Overview

In **skilaverkefni-2** the goal is to **test** the app from **skilaverkefni-1** (Team Task Hub). You build on top of the solution from skilaverkefni-1: the same codebase, same functionality and requirements, but add useful testing tools.

---

## Requirements (testing section)

Build on the code from skilaverkefni-1 and add the following.

### 1. Vitest (unit / component tests)

- Set up **Vitest**.
- Write tests that demonstrate key functionality (e.g. utilities, transformed components, calculations, helpers).
- Tests should run with npm.

### 2. Storybook

- Set up **Storybook** for the application.
- Create stories for component units (e.g. task/project UI, empty states, prop variants) so components can be viewed in isolation.

### 3. Cypress (E2E)

- Set up **Cypress** with E2E tests.
- Tests should cover **at least one real user flow** (e.g. create a project, add a task, mark as done – depending on what the app supports) in a **real browser**.

### 4. CI Pipeline (tests run automatically)

- Set up a **CI pipeline** that runs **the tests** as much as possible, typically on `push` and/or `pull request` to main.
- **Vitest** run in the pipeline.
- **Cypress (E2E)** run in the pipeline.

## 5. There are two bugs in the codebase that you need to find and fix. Use the tests to figure out what they are!

---

## Technology and Submission

- Same as skilaverkefni-1: **TypeScript** and clear structure.
- Define in `package.json` (or equivalent) how to run Vitest, Storybook, and Cypress so the instructor can follow the description.
- Record **CI** in the repo (e.g. `.github/workflows/...` on GitHub or equivalent on another platform) so test results are visible in the overview.

### Rules and Submission (skilaverkefni-2)

- At least **5 Git commits** specifically related to testing (setup + tests) – or equivalent clear incremental commit history.
- Link to **repo** and (if applicable) a brief description of how the tests and **CI** are run.

---

# Grading (100 points) – percentage breakdown

## 1. Vitest – 32 points

- Setup done and tests run: **8**
- Valid tests on logic / units: **15**
- Readable test code and appropriate use of the library (Testing Library etc.): **9**

## 2. Storybook – 28 points

- Storybook starts and stories are visible: **10**
- Diverse stories (states, props, edge cases): **13**
- Professional story folder structure consistent with the application: **5**

## 3. Cypress E2E – 20 points

- E2E runs meaningfully: **6**
- At least one complete E2E scenario demonstrating real behavior: **10**
- Stable tests, clear selectors, not overly brittle: **4**

## 4. Documentation, description and connection to skilaverkefni-1 – 10 points

- Good test organisation within the project
- README or docs describing the testing: **3**
- Accessible npm commands: **3**

## 5. CI Pipeline – 10 points

- CI file exists and runs are visible: **3**
- **Vitest** run automatically: **4**
- **Cypress** run automatically: **3**

---
