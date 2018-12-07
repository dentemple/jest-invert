# jest-invert

Quickly check the integrity of your unit tests by inverting `expect`.

- `true` will become `false`
- `2 + 2` will equal `-4`
- `foobar` will become `raboof`

## How to use

### Step 1

Install as a dev-dependency:

```js
npm install --save-dev jest-invert
```

### Step 2

Invoke and replace Jest's original expect function.

(Option 1: Place in a configuration file)

```js
// setupTests.js
const invert = require('./jest-invert-it')

global.expect = invert()

// alternatively:
// global.expect = invert({isActive: true})
```

(Option 2: [Place within Jest's setup phase](https://jestjs.io/docs/en/setup-teardown#repeating-setup-for-many-tests))

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

## Results

- Boolean values will be switched
- Number values will be multiplied by `-1`
- Strings will be reversed
- Arrays will be reversed

Example:

```js
// When active
expect(true).toBeFalsy() // pass
expect(2 + 2).toEqual(-4) // pass
expect('foobar').toMatch(/boo/) // pass
expect([1, 2, 3]).toEqual([3, 2, 1]) // pass
```

## Deactivate

The library accepts a single configuration object as an argument.

The library's functionality can be deactivated by passing in the value `{isActive: false}`.

Example:

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
