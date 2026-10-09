# DSAA 2044 Lab 5: Testing and CI

A small TypeScript project for learning unit tests, boundary cases, failure
diagnosis, and GitHub Actions. No Android SDK, emulator, web server, or database
is needed. The shipping rules are fictional teaching requirements.

## Start here

Use **Node.js 24**, which includes npm. Read [STUDENT_SETUP.txt](STUDENT_SETUP.txt)
for step-by-step setup on Windows and macOS.

For classroom practice, fork this repository into your own GitHub account and
clone **your fork**. If you only want to try the program locally:

```sh
git clone https://github.com/commoluo/dsaa2044-lab5-testing-ci.git
cd dsaa2044-lab5-testing-ci
npm ci
npm run typecheck
npm test
```

The normal suite should report **six passing tests**. Dependencies are pinned:
Vitest 5.0.3 and TypeScript 7.0.2. Keep `package-lock.json` in Git. Do not commit
`node_modules`, downloaded runtimes, caches, or offline demonstration archives.
Install dependencies before class. Afterwards the local examples do not need
network access. GitHub Actions still needs a GitHub repository and internet.

## The program and its tests

```sh
npm run demo:app     # Print shipping-fee results
npm run typecheck    # Check TypeScript
npm test             # Run the six normal tests once
```

The program prints results in the terminal. It has no web interface.
Running the function and running assertions are separate activities.

| File | Purpose |
| --- | --- |
| `src/shipping.ts` | Correct shipping-fee function |
| `tests/shipping.test.ts` | Six normal unit tests |
| `demo/show-shipping.mjs` | Program output using the TypeScript function |
| `demo/shipping-buggy.ts` | Intentionally faulty copy |
| `demo/failure.test.ts` | Boundary assertion against the faulty copy |
| `demo/fixed.test.ts` | Boundary assertion against the correct function |
| `.github/workflows/ci.yml` | GitHub Actions checks |

## Shipping requirements

- Amounts below 100 have a shipping fee of 10.
- Amounts of 100 or more have a shipping fee of 0.
- Amounts must be finite and non-negative. Invalid inputs throw `RangeError`.
- Zero is valid and has a fee of 10 in this simplified example.

## Local failure and correction

```sh
npm run demo:fail
```

This is **supposed to fail**. The faulty copy uses `amount > 100`, so an amount
of exactly 100 produces 10 when the requirement expects 0.

Open `demo/shipping-buggy.ts`, change `>` to `>=`, save, and rerun the same
command. Restore `>` afterwards if you want to repeat the demonstration.
Alternatively, `npm run demo:fixed` runs the boundary assertion against the
already-correct function in `src/shipping.ts` without editing the faulty copy.

The faulty demonstration is separate from the normal suite. **CI runs `npm test`,
not `npm run demo:fail`.** The original version therefore has passing CI even
though the optional local demonstration intentionally fails.

## GitHub Actions practice

1. Fork this repository, then clone your fork. Changes must be pushed to your
   own repository, not the instructor's repository.
2. Open the **Actions** tab of your fork. If GitHub displays an enable-workflows
   prompt, enable workflows before pushing your classroom changes.
3. Inspect `.github/workflows/ci.yml`. A push or pull request triggers a fresh
   runner that installs dependencies, checks types, and runs the normal tests.
4. To demonstrate a **CI failure**, change the condition in **`src/shipping.ts`**
   from `>= 100` to `> 100`. Commit and push to your fork.
5. Open that commit's Actions run, select the `test` job, and expand the failed
   `npm test` step. Find the input, expected result, and received result.
6. Restore `>= 100`, commit and push again. Inspect the successful run for the
   new commit. Making a fix creates a new run; it does not alter the earlier log.

An installation failure, a type error, and a failed assertion require different
diagnoses. A failed run does not delete the commit. This lab does not configure
repository protections or require a pull request for the exercise.

## Group exercise: 15 minutes

The requirement changes: free shipping now starts at **150**.

1. Update `src/shipping.ts`.
2. Add tests for 149, 150, and 151.
3. Update the old expectations and test names for 100 and 101.
4. Keep the other cases, including the invalid-input test.
5. Run `npm run typecheck` and `npm test`, then commit and push to your fork.
6. Locate the matching Actions run and explain a boundary case.

Expected fees: 149 costs 10, 150 and 151 cost 0, and 100 and 101 now cost 10.
Keeping all original cases and adding three new cases gives nine tests.
If CI is queued, show your local result and identify the corresponding run.

Bonus: test `NaN`, `Infinity`, or an amount such as `99.5`. Local watch mode is
available with `npm run test:watch`. Optional AI review prompts are provided in
[CHATGPT_PROMPTS.txt](CHATGPT_PROMPTS.txt). Run and review any suggested tests.

## References

- [Node.js downloads](https://nodejs.org/en/download)
- [Vitest guide](https://vitest.dev/guide/)
- [Type testing](https://vitest.dev/guide/testing-types)
- [Building and testing Node.js in GitHub Actions](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs)
