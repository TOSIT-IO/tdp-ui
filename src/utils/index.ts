import { clone } from 'mixme'

export * from './arrayHelpers'
export * from './classNames'
export * from './dateAndTime'

/**
 * Splits an object into two arrays:
 * - one containing the primitive variables (string, number, boolean, null)
 * - one containing the object variables
 * @param variables - the variables to split
 * @returns an object containing two arrays of variables (`primitiveVariables` and `objectVariables`)
 * @example
 * ```ts
 * splitVariables({ a: 1, b: { c: 2 } })
 * // Returns:
 * // { primitiveVariables: [['a', 1]], objectVariables: [['b', { c: 2 }]] }
 * ```
 */
export function splitVariables(variables: Object = {}) {
  type SplitObjectVariables = {
    primitiveVariables: [string, string | number | boolean | unknown[]][]
    objectVariables: [string, Object][]
  }

  return Object.entries(variables).reduce<SplitObjectVariables>(
    ({ primitiveVariables, objectVariables }, currentVariable) => {
      const [_, currentValue] = currentVariable
      if (typeof currentValue === 'object' && !Array.isArray(currentValue)) {
        objectVariables.push(currentVariable)
      } else {
        primitiveVariables.push(currentVariable)
      }
      return { objectVariables, primitiveVariables }
    },
    { primitiveVariables: [], objectVariables: [] }
  )
}

/**
 * Parses a JSON string recursively
 * @param obj - the object to parse
 * @returns the parsed object
 * @example
 * ```ts
 * parseRecursively({ a: '1', b: { c: '2' } })
 * // Returns:
 * // { a: 1, b: { c: 2 } }
 * ```
 */
export function parseRecursively(obj: Object) {
  const res = {}
  Object.entries(obj).forEach((o) => {
    const [k, v] = o
    if (typeof v === null) res[k] = null
    if (typeof v === undefined) res[k] = undefined
    if (typeof v === 'object') {
      if (Array.isArray(v)) {
        res[k] = v.map((av) => parseRecursively(av))
      } else {
        res[k] = parseRecursively(v)
      }
    } else {
      res[k] = JSON.parse(v)
    }
  })
  return res
}

/**
 * Flattens an object recursively
 * @param obj - the object to flatten
 * @returns the flattened object
 * @example
 * ```ts
 * flattenObject({ a: 1, b: { c: 2 } })
 * // Returns:
 * // { 'a': 1, 'b.c': 2 }
 * ```
 */
export function flattenObject(obj: Object) {
  const res = {}
  Object.entries(obj).forEach((o) => {
    const [k, v] = o
    if (typeof v === 'object' && v !== null) {
      if (Array.isArray(v)) {
        res[k] = v.map((av) => flattenObject(av))
      } else {
        Object.entries(flattenObject(v)).forEach((fo) => {
          const [fk, fv] = fo
          res[k + '.' + fk] = fv
        })
      }
    } else {
      res[k] = v
    }
  })
  return res
}

/**
 * Returns the difference between two objects
 * @param obj1 - object to compare
 * @param obj2 - object to compare
 * @returns the difference between the two objects
 * @example
 * ```ts
 * const obj1 = { a: 1, b: 2, c: 3 }
 * const obj2 = { a: 1, b: 2, c: 4 }
 * const result = diff(obj1, obj2)
 * // result = { c: 4 }
 * ```
 */
export function diff(obj1: object, obj2: object) {
  const result = {}
  const obj2Copy = clone(obj2)
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj2.hasOwnProperty(key)) {
        if (isObject(obj1[key]) && isObject(obj2[key])) {
          const diffResult = diff(obj1[key], obj2[key])
          if (diffResult) {
            result[key] = diffResult
          } else {
            delete obj2Copy[key]
          }
        } else if (obj1[key] !== obj2[key]) {
          result[key] = obj2[key]
        } else {
          delete obj2Copy[key]
        }
      } else {
        result[key] = null
      }
    }
  }
  for (const key in obj2Copy) {
    if (obj2Copy.hasOwnProperty(key)) {
      result[key] = obj2Copy[key]
    }
  }
  return Object.keys(result).length > 0 ? result : null
}

const isObject = (item: any) => item && typeof item === 'object'
