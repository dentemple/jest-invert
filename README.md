# jest-invert

[![npm](https://img.shields.io/npm/v/jest-invert.svg)](https://www.npmjs.com/package/jest-invert) [![Build Status](https://travis-ci.com/dentemple/jest-invert.svg?branch=master)](https://travis-ci.com/dentemple/jest-invert) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/jest-invert.svg)](https://www.npmjs.com/package/jest-invert)

A micro-library for [Jest](https://jestjs.io/) that quickly checks the integrity of your unit tests by inverting your test returns. Specifically, it inverts the return values of [`jest.expect()`](https://jestjs.io/docs/en/expect).

Unit tests such as `expect(2 + 2)` to return `-4`, causing the expression `expect(2 + 2).toEqual(4)` to return false, intentionally.

## But why?

Because a great unit test is not a good unit test until you see it fail (at least once).

However, the more tests there are in an application, the more tedious it can be to break each of them in an appreciable way.

This library simply allows you to fail a large group of tests at once. Invoke `global.expect = invert()` in the setup file--or inside a `describe` block)--and let it do its thing.

_Inverting these return values_, as opposed to returning random noise, also provides us a predictable failure mode. When an inverted test returns `false` when the original test returned `true`, then we can be reasonably certain that our original expectations are still valid.

If, however, the inverted test returns `"eurt"` (which is the inverse of string "true", not boolean `true`), then we can be reasonably certain that there's an error in the original logic.

[Read more about Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)

## Library Quick Reference

```js
/* install */
npm install --save-dev jest-invert

/* require */
const invert = require('./jest-invert')

/* invert ALL tests...  */
// setupTests.js
global.expect = invert()

/* ... or invert only SOME tests */
// foo.test.js
describe('foo', function() {
  let expect

  beforeAll(function() {
    expect = invert()
  })

  afterAll(function() {
    expect = invert({ run: false })
  })

  it('can add 2 + 2', function() {
    expect(2 + 2).toEqual(4) // intentionally fails
  })

  /* ... */
})

/* example tests that will now intentionally fail */
expect(true).toEqual(true) // false === true
expect(42).toEqual(42) // -42 === 42
expect('mystring').toEqual('mystring') // "gnirtsym" === "mystring"
expect([1, 2, 3]).toEqual([1, 2, 3]) // [3, 2, 1] === [1, 2, 3]
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 }) // {"1":"a", "2":"b"} === { a: 1, b: 2 }
```

## How it works

### 1) Install

```js
/* with npm */
npm install --save-dev jest-invert

/* with yarn */
yarn add --dev jest-invert
```

### 2) Invoke

```js
const invert = require('./jest-invert')

global.expect = invert()

/* For Typescript projects, prefer passing in an empty object for the default settings */
global.expect = invert({})
```

Alternatively, pass in a configuration object for more explicit activation and deactivation. (Recommended for Typescript users).

```js
global.expect = invert({ run: true })
global.expect = invert({ run: false })
```

This can be placed in Jest's setup/teardown cycle to affect only a block of tests.

Example:

```js
describe('my tests', function() {
  var expect
  beforeAll(() => {
    expect = invert({ run: true }) // or invert()
  })

  afterAll(() => {
    expect = invert({ run: false })
  })

  it('my unit test', function() {
    expect(42).not.toEqual(42)
  })

  /* ... */
})
```

### 3) Results

The following changes will occur:

- Booleans will flip to the opposite value (`true` to `false`, and vice versa)
- `undefined` and `null` will evaluate to `true`
- Numbers will flip to the opposite sign (`1` to `-1`, and vice versa)
- Strings will be reversed
- Arrays will be reversed
- Objects will swap keys and values (at a shallow-level only)

_Note on objects_: The key/value swap uses `JSON.stringify()` to avoid multiple values from being converted to `[object Object]`.

### Examples

```js
const invert = require('jest-invert')
expect = invert()

/* All of the following statements will now intentionally fail */

expect(true).toEqual(true) // false === true
expect(undefined).toEqual(undefined) // true === undefined
expect(null).toEqual(null) // true === null
expect(42).toEqual(42) // -42 === 42
expect(Infinity).toEqual(Infinity) // -Infinity === Infinity
expect('mystring').toEqual('mystring') // "gnirtsym" === "mystring"
expect([1, 2, 3]).toEqual([1, 2, 3]) // [3, 2, 1] === [1, 2, 3]
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 }) // {"1":"a", "2":"b"} === { a: 1, b: 2 }
```

---

## API

### `require('jest-invert')`

> `({ expect, run = true }: config) => any`

Returns a higher-order function. Accepts a configuration object, and returns the main `invert` function.

Use this returned function to replace `jest.expect`.

For Typescript users, an object is required as the first and only argument. This can be an empty object.

Usage:

```js
const invert = require('jest-invert')

console.log(global.expect) // function definition from jest

// Javascript
global.expect = invert()

// Typescript
global.expect = invert({})

console.log(global.expect) // function definition from jest-invert
```

### `config.run`

> `run?: boolean | null`

Boolean.

If set to `true`, activates _jest-invert_'s core functionality.

If set to `false`, _jest-invert_ will have no effect.

Defaults to `true`.

Usage:

```js
describe('my tests', function() {
  var expect
  beforeAll(() => {
    expect = invert({ run: true })
  })

  afterAll(() => {
    expect = invert({ run: false })
  })

  it('my unit test', function() {
    expect(42).not.toEqual(42)
  })

  /* ... */
})
```

### `config.expect`

> `expect?: any`

Function. _For future compatibility only._

If ever the Jest team re-configures their library to avoid polluting the global scope, pass Jest's `expect` function as a callback to the `config.expect` property. _jest-invert_ checks this property before checking the global scope.

Usage:

```js
const jest = require('jest')
const invert = require('jest-invert')

console.log(global.expect) // undefined

const expect = invert({ expect: jest.expect })

console.log(expect) // function definition from jest-invert
```

---

## Changelog

View the recent changes [here](CHANGELOG.md).

## Code of Conduct

Read the Code of Conduct [here](CODE-OF-CONDUCT.md). Contributions that violate these principles may be removed.

## License

This library is _Free and Open Source_ under the [MIT License](LICENSE).
