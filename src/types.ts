import type { expect as jestGlobalExpect } from '@jest/globals'

export type JestGlobalExpect = typeof jestGlobalExpect

export type WrappedFunction<T extends (...args: unknown[]) => unknown> = () => T

export type SwappedObject = Record<string, string>

export type InvertedValue<T> = T extends null | undefined
  ? true
  : T extends boolean
    ? boolean
    : T extends bigint | number
      ? T
      : T extends string
        ? string
        : T extends symbol
          ? T
          : T extends (...args: unknown[]) => unknown
            ? WrappedFunction<T>
            : T extends readonly (infer Member)[]
              ? Member[]
              : T extends object
                ? SwappedObject | T
                : T

export type ConfigureInvertProps = {
  expect?: JestGlobalExpect
  patchGlobal?: boolean
  run?: boolean | null
}
