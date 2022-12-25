export const invertString = (actual: string): string =>
  actual
    .split('')
    .reverse()
    .join('')

export default invertString
