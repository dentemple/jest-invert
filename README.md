# jest-invert

Invert the value passed to Jest's `expect()` so you can prove a test really fails before you trust it.

## Status

`jest-invert` is now aligned with current Node, Jest, TypeScript, and package-publishing expectations:

- Node `20`, `22`, and `24`
- Jest `^29.7.0 || ^30.0.0`
- npm `10+` as the primary package manager
- Dual ESM and CJS package exports

This modernization is intended for the next **major release** because it updates packaging, supported runtimes, and some runtime behavior.

## Install

```bash
npm install --save-dev jest-invert jest
```

## Recommended usage

Prefer explicit wrapping in test files or setup files.

```ts
import { expect as jestExpect } from '@jest/globals'
import invert from 'jest-invert'

const expect = invert({ expect: jestExpect })

expect(2 + 2).toEqual(4) // fails because the received value becomes -4
```

### Optional global patching

If you still want to patch the global Jest runtime, do it explicitly.

```ts
import { expect as jestExpect } from '@jest/globals'
import invert from 'jest-invert'

beforeAll(() => {
  invert({ expect: jestExpect, patchGlobal: true })
})
```

### CommonJS

```js
const { expect: jestExpect } = require('@jest/globals')
const invert = require('jest-invert').default

const expect = invert({ expect: jestExpect })
```

## What gets inverted

| Received value       | Inverted value           |
| -------------------- | ------------------------ |
| `true`               | `false`                  |
| `false`              | `true`                   |
| `undefined` / `null` | `true`                   |
| `42`                 | `-42`                    |
| `4n`                 | `-4n`                    |
| `'abc'`              | `'cba'`                  |
| `[1, 2, 3]`          | `[3, 2, 1]`              |
| `{ a: 1, b: 2 }`     | `{ '1': 'a', '2': 'b' }` |
| `function demo() {}` | `[Function inverted]`    |

## Object behavior

- Arrays are reversed **without mutating the original input**.
- Only **plain objects** are key/value swapped.
- Non-plain objects such as `Date`, `Map`, `Set`, class instances, and other custom objects pass through unchanged.
- Plain-object value collisions still follow normal object overwrite behavior: the last serialized value wins.

## API

### `invert(options?)`

Returns an `expect`-compatible function.

```ts
type ConfigureInvertProps = {
  expect?: typeof import('@jest/globals').expect
  patchGlobal?: boolean
  run?: boolean | null
}
```

#### `options.expect`

Pass the Jest `expect` implementation to wrap. This is the recommended way to use the library in modern Jest code.

#### `options.patchGlobal`

When `true`, replace `globalThis.expect` with the wrapped version. This is optional and disabled by default.

#### `options.run`

When `false`, return the original `expect` unchanged.

## Migration notes

If you are upgrading from older releases:

- Use `import { expect as jestExpect } from '@jest/globals'` for explicit wrapping.
- Do not rely on implicit global mutation; use `patchGlobal: true` if you need it.
- Browser and UMD bundles are gone. The package now targets Jest in Node runtimes only.
- Arrays are now inverted non-destructively.
- Only plain objects are swapped; non-plain objects now pass through unchanged.
- Package entrypoints now come from the `exports` map.

## Local development

```bash
npm ci
npm run verify
```

## Release flow

This repository now uses Changesets for versioning and release PR automation.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT](./LICENSE)
