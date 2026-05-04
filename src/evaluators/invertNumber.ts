export const invertNumber = <T extends bigint | number>(actual: T): T =>
  -actual as T

export default invertNumber
