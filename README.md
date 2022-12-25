# jest-invert

[![npm](https://img.shields.io/npm/v/jest-invert.svg)](https://www.npmjs.com/package/jest-invert) [![Build Status](https://travis-ci.com/dentemple/jest-invert.svg?branch=master)](https://travis-ci.com/dentemple/jest-invert) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/jest-invert.svg)](https://www.npmjs.com/package/jest-invert)

**A library for breaking a bunch of tests quickly.**

This library does not add[matchers](https://jestjs.io/docs/expect#expectextendmatchers).  What this library does is grab your `expect` argument _before_ it hits the function, inverts the value, _then_ passes it on to `expect` (via currying).

`expect(2 + 2).toEqual(4)` will fail with the result `Expected: 4, Received: -4`.

`expect('ABC').toEqual('ABC')` will fail with the result `Expected: "ABC", Received: "CBA"`.

## But... why?

~~Because some men want to watch the world burn.~~

Because a great unit test is not a good unit test until you see it fail (at least once).  However, manually failing a bunch of tests individually can be tedious.

So this allows you to attack all of the tests within a certain scope all at once.  Do it only for a single `describe` block, or fail literally everything in the code base.  It just depends on where you invoke the library's main function.

~~Also, this can be used to troll your team members to great effect.~~

[Read more about Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)

### But why "invert" the values instead of just, y'know, _throwing an error_

Inverting these return values, as opposed to returning random noise, provides a predictable failure mode. A sample test that returns `"eurt"` when it should return `false` can generate a more meaningful message than a generic error message.

## Library Quick Reference

```js
/* install */
npm install --save-dev jest-invert

/* require */
const invert = require('./jest-invert')

/* ES6+ */
import invert from 'jest-invert'

/* invert ALL tests...  */
// setupTests.js
global.expect = invert()

/* ... or invert only SOME tests */
// foo.test.ts
describe('foo', function() {
  let expect: any

  beforeAll(function() {
    expect = invert() // ⚠️ Invoke within the `before`/`beforeAll` block
  })

  afterAll(function() {
    expect = invert({ run: false }) // ⚠️ Deactivate within the `after`/`afterAll` block
  })

  it('can add 2 + 2', function() {
    expect(2 + 2).toEqual(4) // ⚠️ Fails, as expected
  })

  /* ... */
})

/* example tests that will be affected by this library */

expect(true).toEqual(true)  // ⚠️ Changes to: false === true
expect(42).toEqual(42) // ⚠️ Changes to: -42 === 42
expect('mystring').toEqual('mystring') // ⚠️ Changes to: changes to: "gnirtsym" === "mystring"
expect([1, 2, 3]).toEqual([1, 2, 3]) // ⚠️ Changes to: changes to: [3, 2, 1] === [1, 2, 3]
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 }) // ⚠️ Changes to: changes to: {"1":"a", "2":"b"} === { a: 1, b: 2 }
expect(myFunction).toEqual(myFunction)  // ⚠️ Changes to: [Function inverted] === [Function myFunction]
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
/* ES5 */
const invert = require('./jest-invert')

/* ES6+ */
import invert from 'jest-invert'

global.expect = invert()

/* For Typescript projects, prefer passing in an empty object for the default settings */
global.expect = invert({})

/* For more explicit activation or control, use the `run` argument */

global.expect = invert({ run: true })
global.expect = invert({ run: false })
```

Alternatively, pass in a configuration object for more explicit activation and deactivation.


This can be placed in Jest's setup/teardown cycle to affect only a block of tests.

Example:

```js
describe('my tests', function() {
  var expect
  beforeAll(() => {
    expect = invert({ run: true }) // or just `invert()`
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
- Objects\* will swap keys and values (at a shallow-level only)
- Functions\*\* will be wrapped in a different, higher order function named "inverted"

_\*Note on objects_: The key/value swap uses `JSON.stringify()` to create the keys.  This is to avoid `[object Object]` from being the end result of every operation.

_\*\*Note on functions_: "Inverting" a function has a precise mathematical definition that falls quite outside the scope of a simple testing libary. Passing a function definition into `expect` also happens to be behavior that is typically _not_ recommended for users of Jest to perform.

Therefore, to err on the side of predictability ,`jest-invert` simply curries the argument through another function named "inverted."

```js
function invertFunction(actual) {
  return function inverted() {
    return actual
  }
}
```

The end result:

Jest's failure message will return `[Function inverted]` as the argument name.

This has the added benefit of making it obvious that the original function does or doesn't exist.

---

## API

### `require('jest-invert')`

> `({ expect, run = true }: config) => any`

Returns a higher-order function. Accepts a configuration object, and returns the main `invert` function.

Use this returned function to replace `jest.expect`.

An empty object can be passed in as well.

Usage:

```js
const invert = require('jest-invert')

console.log(global.expect) // function definition from jest

global.expect = invert() // or global.expect = invert({})

console.log(global.expect) // ⚠️ function definition from jest-invert
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

May also be useful in the rare case that your codebases uses a custom or monkeypatched `expect` function--assuming that the API is simmilar.

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
