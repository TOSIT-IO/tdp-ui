export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function switch2ElementsFromList(
  list: string[],
  startIndex: number,
  endIndex: number
) {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export function removeElementFromList(list: string[], index: number) {
  const result = [...list]
  result.splice(index, 1)
  return result
}

export function updateElementFromList(
  list: string[],
  index: number,
  value: string
) {
  if (list.includes(value)) {
    return list
  }
  const result = [...list]
  result.splice(index, 1, value)
  return result
}

export function getFirstElementIfArray<T>(value: T) {
  return Array.isArray(value) ? value[0] : value
}
