import type { WrappedFunction } from '../types'

export function invertFunction<T extends (...args: unknown[]) => unknown>(
  actual: T,
): WrappedFunction<T> {
  return function inverted() {
    return actual
  }
}

export default invertFunction
