# jest-invert

[![npm](https://img.shields.io/npm/v/jest-invert.svg)](https://www.npmjs.com/package/jest-invert)[![Build Status](https://travis-ci.com/dentemple/jest-invert.svg?branch=master)](https://travis-ci.com/dentemple/jest-invert)[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/jest-invert.svg)](https://www.npmjs.com/package/jest-invert) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Check the integrity of your unit tests by inverting the return value of [`expect`](https://jestjs.io/docs/en/expect).

- `expect(true)` will evaluate to `false`
- `expect(null)` will evaluate to `undefined`
- `expect(2 + 2)` will evaluate to `-4`
- `expect("foobar")` will evalute `"raboof"`

Quick reference:

```js
// install
npm install --save-dev jest-invert

// activate
// setupTests.js
const invert = require('./jest-invert')
global.expect = invert()

// deactivate by utilizing the `isActive` flag
global.expect = invert({isActive: flag})

// invert arrays and objects as well, not just primitives
global.expect = invert({all: true})

// can be scoped by utilizing within the setup/teardown phases
describe('MY_UNIT_TEST', () => {
  beforeEach(() => {
      global.expect = invert()
    })

  afterEach(() => {
    global.expect = invert({ isActive: false })
  })

  it('adds 2 + 2', function() {
    expect(2 + 2).toEqual(4) // intentionally fails
  })
})

// Current workaround for any missing properties on the `expect` object
expect(2 + 2).toEqual(expect.any(Number)) // will currently error
expect(2 + 2).toEqual(jestExpect.any(Number)) // will be fine
```

Requires `jest` to be in scope.

[Read more about unit testing with `jest`.](https://jestjs.io/)

## How to use

### Step 1

Install as a dev-dependency:

```js
npm install --save-dev jest-invert
```

### Step 2

Invoke the configuration object, and replace Jest's original expect function.

#### Option 1: Apply globally by invoking `jest-invert` in a [configuration file](https://jestjs.io/docs/en/configuration.html)

```js
// setupTests.js
const invert = require('./jest-invert')

global.expect = invert()

// alternatively:
// global.expect = invert({isActive: true})
```

#### Option 2: Apply only to a specific set of tests by invoking `jest-invert` during the [setup phase](https://jestjs.io/docs/en/setup-teardown#repeating-setup-for-many-tests)

```js
// YOUR_UNIT_TEST_FILE.js
beforeEach(() => {
  global.expect = invert()
})

// alternatively:
/*
  beforeEach(() => {
    global.expect = invert({isActive: true})
  });
*/
```

By utilizing the setup/teardown phases of Jest, Option #2 allows users to scope `jest-invert` to only a few unit tests.

For example:

```js
describe('foobar', () => {
  describe('without jest-invert', () => {
    it('adds 2 + 2', () => {
      expect(2 + 2).toEqual(4) // will pass
    })
  })

  describe('with jest-invert', () => {
    beforeEach(() => {
      global.expect = invert({ isActive: true })
    })

    it('adds 2 + 2', () => {
      expect(2 + 2).toEqual(4) // will fail
    })
  })
})
```

## Results

### Default

- `true` will flip to `false`, and vice versa
- `null` will flip to `undefined`, and vice versa
- `number` values will be multiplied by `-1`
- `string` values will be reversed

Examples:

```js
// When active
expect(true).toBeFalsy() // pass
expect(2 + 2).toEqual(-4) // pass
expect('foobar').toMatch(/boo/) // pass
```

### Extending to Arrays and Objects

To affect reference-based structures as well, set `all` equal to `true` on the configuration argument.

```js
global.expect = invert({ all: true })
```

- Arrays will be reversed (shallow-only)
- Objects will swap keys and values (shallow-only)

Examples:

```js
expect([1, 2, 3]).toEqual([3, 2, 1]) // pass
expect({ str: 'hello', val: 42 }).toEqual({ hello: 'str', '42': 'val' }) // pass
```

## Deactivate

The library accepts a single object as an argument. Set the property `isActive` to `false` to deactivate the library.

```js
global.expect = invert({ isActive: false })
```

Or you can just delete the whole line entirely :)

---

## Changelog

View any recent changes [here](CHANGELOG.md).

## Code of Conduct

Read the Code of Conduct [here](CODE-OF-CONDUCT.md).

## License

This library is Free and Open Source under the [MIT License](LICENSE).
