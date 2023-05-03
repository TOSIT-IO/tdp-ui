/**
 * Returns a new array with the element at the given index added.
 * @param list - The list to add the element to
 * @param index - The index to add the element at
 * @param element - The element to add
 * @returns A new array with the element at the given index added
 */
export const addElementToList = <T>(
  list: T[],
  index: number,
  element: T
): T[] => {
  return [...list.slice(0, index), element, ...list.slice(index)]
}

/**
 * Returns a new array with the element appended to the end.
 * @param list - The list to append the element to
 * @param element - The element to append
 * @returns A new array with the element appended to the end
 */
export const appendElementToList = <T>(list: T[], element: T): T[] => {
  return [...list, element]
}

/**
 * Returns a new array without the element at the given index.
 * @param list - The list to remove the element from
 * @param index - The index of the element to remove
 * @returns A new array without the element at the given index
 */
export const removeElementFromList = <T>(list: T[], index: number): T[] => {
  return [...list.slice(0, index), ...list.slice(index + 1)]
}

/**
 * Returns a new array with the element moved to the given index.
 * @param list - The list to move the element in
 * @param sourceIndex - The index of the element to move
 * @param destinationIndex - The index to move the element to
 * @returns A new array with the element moved to the given index
 */
export const moveElementInList = <T>(
  list: T[],
  sourceIndex: number,
  destinationIndex: number
): T[] => {
  const [removed] = list.splice(sourceIndex, 1)
  return addElementToList(list, destinationIndex, removed)
}
