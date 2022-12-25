export function invertFunction(actual: Function): Function {
  // Note: The function name is important here; it'll show up in the end user's test results
  return function inverted(): Function {
    return actual
  }
}

export default invertFunction