import {
  doNothing,
  invertBoolean,
  invertEmpty,
  invertFunction,
  invertNumber,
  invertObject,
  invertString
} from './conversions'

const evaluators = {
  bigint: invertNumber,
  boolean: invertBoolean,
  function: invertFunction,
  number: invertNumber,
  object: invertObject,
  string: invertString,
  symbol: doNothing,
  undefined: invertEmpty
}

export default evaluators
