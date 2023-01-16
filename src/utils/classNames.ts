/**
 * Join all the classes passed as arguments into a single string.
 * @param classes - List of classes to join
 * @returns The joined classes
 * @example
 * classNames('foo', false && 'bar') // 'foo'
 */
export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
