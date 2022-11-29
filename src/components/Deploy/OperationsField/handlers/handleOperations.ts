export function handleOperations(
  operations: string[],
  setOperations: React.Dispatch<React.SetStateAction<string[]>>
) {
  function isOperationAlreadyExisting(operation: string): boolean {
    return operations.includes(operation.trim())
  }

  function isOperationAlreadyExistingAt(index: number, input: string): boolean {
    return input.trim() === operations[index]
  }

  function removeOperation(index: number): void {
    setOperations((prevEntries) => {
      const newEntries = [...prevEntries]
      newEntries.splice(index, 1)
      return newEntries
    })
  }

  function removeLastOperation(): void {
    if (operations.length)
      setOperations((prevEntries) => {
        const newEntries = [...prevEntries]
        newEntries.pop()
        return newEntries
      })
  }

  function modifyOperation(index: number, newOperation: string): void {
    setOperations((prevEntries) => {
      const newEntries = [...prevEntries]
      newEntries.splice(index, 1, newOperation.trim())
      return newEntries
    })
  }

  function addOperation(newOperation: string): void {
    setOperations((prev) => [...prev, newOperation.trim()])
  }

  return {
    isOperationAlreadyExisting,
    isOperationAlreadyExistingAt,
    removeLastOperation,
    removeOperation,
    modifyOperation,
    addOperation,
  }
}
