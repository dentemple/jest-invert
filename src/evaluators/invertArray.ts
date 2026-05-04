export const invertArray = <T>(actual: readonly T[]): T[] =>
  [...actual].reverse()

export default invertArray
