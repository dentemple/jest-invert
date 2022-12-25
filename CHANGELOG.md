# Changelog

## v0.4.0

- Update to Rollup's deployment config
- Refactoring maintenance across the codebase

## v0.3.5

- Previously, this library skipped transformations of functions due to the complexity of "inverting" a function mathematically; now, this library curries the original function forward (SEE THE UPDATED README FOR AN EXPLANATION AS TO WHY)
- Updated README to reflect changes
- Refactored the original `evaluators` file into a directory with multiple files
- Refactored the library's internal definition of "invertObject" vs "handleObject"
- Minor updates to README
- Minor comment update to `types.ts` file

## v0.3.4

- Update packages

## v0.3.3

- Improve typings

## v0.3.2

- Update `invert`'s function definition to allow an argument of undefined
  - Note: It seems not to be intuitive to pass in an empty object for non-typescript projects, and, unfortunately, I've haven't found a solution for allowing undefineds for JS but not for TS
- Minor update to docs, including to the Code of Conduct

## v0.3.1

- Update libraries
- Update Code of Conduct to better reflect the original author's intent
- Minor updates to README

## v0.3.0

- Configured and refactored to Typescript
- Configured Rollup
- Now exporting library to multiple formats
- Updated general project settings
- Configured Prettier
- Updated relevant documentation
- Updated misc. dev packages

## v0.2.0

- Solved major integration bug (github.com/dentemple/jest-invert/issues/1)
- Removed workaround (now defunct) caused by aforementioned bug
- Renamed the `.isActive` method to `.run`
- Refactored main
- Refactored main tests
- Added integration tests
- Partial conversion to ES6 (in anticipation of a full conversion to Typescript)
- Arrays and Objects are now part of the main API; removed the now defunct `.all()` API option
- Updated README
- Set `jest` as a peer dependency

## v0.1.3

- Minor updates to docs

## v0.1.2

- Added functionality to invert objects as well
- Placed the Array and Object functionality behind a user flag
- Added `jestExpect` to the global object as a work-around to [Issue #1](https://github.com/dentemple/jest-invert/issues/1)

## v0.1.1

- Update docs
  - Add minor correction
  - Add shields
- `package.json` (fluff additions)
  - Add keywords
  - Add package urls

## v0.1.0

MVP
