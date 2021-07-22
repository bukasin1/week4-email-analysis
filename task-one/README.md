# 1 JavaScript - FileTree Bug

## Introduction

Here is a part of an application that creates a file tree data structure from JSON input. However, there are one or more bugs in this code. It seems that for some data sets this code creates an incorrect tree structure.

Another developer was able to isolate the bug and wrote a test case that simulates the bug. See `__tests__/app.spec.js` for test case details. You can run the test to see which tests are failing.

## Problem Statement

Your job is to find the bug and fix it. The only file that should be changed is `src/app.js`. You can always build the project to see if your solution works.

# Setup

1. `npm install` or `Yarn` – install dependencies
2. `npm test` or `Yarn test`– run all tests once (this will be used to evaluate your solutions)
3. `npm run test:watch` or `yarn test --w` - run all tests in _watch mode_ (optionally, you can use it locally if you prefer)
