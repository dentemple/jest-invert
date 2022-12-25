import invertBoolean from './invertBoolean'
import invertEmpty from './invertEmpty'
import invertFunction from './invertFunction'
import invertNumber from './invertNumber'
import invertObject from './invertObject'
import invertString from './invertString'
import doNothing from './doNothing'

export {
  invertBoolean,
  invertEmpty,
  invertFunction,
  invertNumber,
  invertObject,
  invertString,
  doNothing,
}

// Combined into a map for easier access
export const evaluators = {
  bigint: invertNumber,
  boolean: invertBoolean,
  function: invertFunction,
  number: invertNumber,
  object: invertObject,
  string: invertString,
  symbol: doNothing,
  undefined: invertEmpty,
}

export default evaluators
