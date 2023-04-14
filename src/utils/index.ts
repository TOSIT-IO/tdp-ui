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
