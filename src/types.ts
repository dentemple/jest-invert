export type AnyJavascriptObject = Object[] | Array<any> | null

export type Config = {
  run?: boolean | null
  expect?: any
}

// Short explanation: We utilize `any` here to support multiple versions of Jest.
// Long explanation: Jest utilizes the "Function-Object" nature of JS functions
//    when building the `expect` object, which means it's an invokable function
//    that also has object properties on it.  To TS type it, we could either
//    import `expect` from a specific version of Jest, or try to type both sides
//    of this object in a way that's compatible for all versions of the library.
//    So as not to risk unnecessarily breaking someone's environment with a
//    poorly chosen abstraction--for what's essentially a very minor benefit
//    overall--chosing to type `expect` as `any` seems good enough.
export type Expect = any

export type InvertedObject = SwappedObject | Array<any> | boolean

export type Invert = {
  (actual: undefined, ...rest: Array<any>): boolean
  (actual: null, ...rest: Array<any>): boolean
  (actual: boolean, ...rest: Array<any>): boolean
  (actual: number, ...rest: Array<any>): number
  (actual: string, ...rest: Array<any>): string
  (actual: symbol, ...rest: Array<any>): symbol
  (actual: Array<any>, ...rest: Array<any>): Array<any>
  (actual: Object[], ...rest: Array<any>): Object[]
  (actual: Function, ...rest: Array<any>): Function
}

export interface SwappedObject {
  [key: string]: string
}
