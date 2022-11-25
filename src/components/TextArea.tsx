import React, { useCallback, useEffect, useRef, useState } from 'react'
import { classNames } from 'src/utils'
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/solid'

function useOperations() {
  const [operations, setOperations] = useState<string[]>([])

  function isOperationAlreadyExisting(operation: string): boolean {
    return operations.includes(operation.trim())
  }

  function isOperationAlreadyExistingAt(index: number, input: string) {
    return input.trim() === operations[index]
  }

  function removeOperation(index: number) {
    setOperations((prevEntries) => {
      const newEntries = [...prevEntries]
      newEntries.splice(index, 1)
      return newEntries
    })
  }

  function removeLastOperation() {
    if (operations.length)
      setOperations((prevEntries) => {
        const newEntries = [...prevEntries]
        newEntries.pop()
        return newEntries
      })
  }

  function modifyOperation(index: number, newOperation: string) {
    setOperations((prevEntries) => {
      const newEntries = [...prevEntries]
      newEntries.splice(index, 1, newOperation.trim())
      return newEntries
    })
  }

  function addOperation(newOperation: string) {
    setOperations((prev) => [...prev, newOperation.trim()])
  }

  return {
    operations,
    isOperationAlreadyExisting,
    isOperationAlreadyExistingAt,
    removeLastOperation,
    removeOperation,
    modifyOperation,
    addOperation,
  }
}

function useFocus() {
  const mainRef = useRef<HTMLInputElement>(null)
  const [secondaryRef, setSecondaryRef] =
    useState<React.MutableRefObject<HTMLInputElement>>(null)

  const setFocus = useCallback(() => {
    if (secondaryRef) {
      secondaryRef.current.focus()
    } else {
      mainRef.current.focus()
    }
  }, [secondaryRef])

  useEffect(() => {
    setFocus()
  }, [secondaryRef, setFocus])

  return { mainRef, setSecondaryRef, setFocus }
}

export function OperationsList({ label, name, isDisabled }) {
  const {
    operations,
    isOperationAlreadyExisting,
    isOperationAlreadyExistingAt,
    modifyOperation,
    removeLastOperation,
    removeOperation,
    addOperation,
  } = useOperations()
  const { mainRef, setSecondaryRef, setFocus } = useFocus()

  return (
    <>
      <label
        htmlFor={name}
        className={classNames(
          'block text-lg font-medium',
          isDisabled ? 'text-gray-500' : 'text-gray-700'
        )}
      >
        {label}
      </label>
      <div className="mt-1" onClick={() => setFocus()}>
        <div
          className={classNames(
            'flex flex-wrap gap-1 border border-gray-300 rounded-md p-1 cursor-text',
            isDisabled && 'bg-gray-200'
          )}
        >
          {operations.map((v, i) => (
            <Operation
              key={v}
              operation={v}
              index={i}
              {...{
                setSecondaryRef,
                isOperationAlreadyExisting,
                isOperationAlreadyExistingAt,
                modifyOperation,
                isDisabled,
                removeOperation,
              }}
            />
          ))}
          <MainInput
            {...{
              mainRef,
              isOperationAlreadyExisting,
              addOperation,
              removeLastOperation,
              isDisabled,
            }}
          />
        </div>
      </div>
    </>
  )
}

function MainInput({
  isOperationAlreadyExisting,
  addOperation,
  removeLastOperation,
  isDisabled,
  mainRef,
}) {
  const [input, setInput] = useState('')

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case ',':
      case ' ':
      case 'Enter':
      case 'Escape':
        e.preventDefault()
        if (input.trim()) {
          if (isOperationAlreadyExisting(input)) return
          addOperation(input)
          setInput('')
        }
        break
      case 'Backspace':
        if (!input.length) {
          e.preventDefault()
          removeLastOperation()
        }
        break
      default:
        break
    }
  }

  return (
    <input
      type="text"
      disabled={isDisabled}
      ref={mainRef}
      style={{ width: `max(1ch,${input.length}ch)` }}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleOnKeyDown}
      className="bg-transparent outline-none font-mono"
    />
  )
}

function Operation({
  operation,
  index,
  setSecondaryRef,
  isOperationAlreadyExisting,
  isOperationAlreadyExistingAt,
  modifyOperation,
  isDisabled,
  removeOperation,
}) {
  const [isEditable, setIsEditable] = useState(false)
  const secondaryInputRef = useRef<HTMLInputElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    isEditable ? setSecondaryRef(secondaryInputRef) : setSecondaryRef(null)
  }, [isEditable, setSecondaryRef])

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (componentRef.current && !componentRef.current.contains(event.target)) {
  //       // what to do when clicked outside
  //       console.log("outside")
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutside, true)
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true)
  //   }
  // }, [componentRef])

  function handleRemoveOperation() {
    removeOperation(index)
  }

  return (
    <div
      className="flex bg-gray-200 border border-gray-500 rounded-md overflow-hidden cursor-pointer"
      ref={componentRef}
    >
      {!isDisabled && isEditable ? (
        <input
          defaultValue={operation}
          style={{ width: `calc(${input.length}ch + 0.5rem)` }}
          onChange={(e) => setInput(e.target.value)}
          ref={secondaryInputRef}
          onKeyDown={handleOnKeyDown}
          className="px-1 bg-white outline-none font-mono"
        />
      ) : (
        <span
          className="px-1 font-mono"
          onDoubleClick={() => {
            if (!isDisabled) {
              setIsEditable(true)
            }
          }}
        >
          {operation}
        </span>
      )}
      <button
        type="button"
        className={classNames(
          'h-full px-1 border-l border-gray-500 -ml-px',
          !isDisabled && 'bg-pink-700',
          !isDisabled && isEditable && 'bg-green-700'
        )}
        disabled={isDisabled}
        onClick={() => removeOperation(index)}
      >
        {isEditable && !isDisabled ? (
          <PencilIcon className="w-4 h-4" />
        ) : (
          <XMarkIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}

function DisplayOperation({
  operation,
  isDisabled,
  setIsEditable,
  handleRemoveOperation,
}) {
  return (
    <>
      <span
        className="px-1 font-mono"
        onDoubleClick={() => {
          if (!isDisabled) {
            setIsEditable(true)
          }
        }}
      >
        {operation}
      </span>
      <button
        type="button"
        className={classNames(
          'h-full px-1 border-l border-gray-500 -ml-px',
          !isDisabled && 'bg-pink-700'
        )}
        disabled={isDisabled}
        onClick={handleRemoveOperation}
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </>
  )
}

function EditOperation({
  operation,
  isOperationAlreadyExistingAt,
  setIsEditable,
  index,
  isOperationAlreadyExisting,
  modifyOperation,
  secondaryInputRef,
  handleEditOperation,
}) {
  const [input, setInput] = useState(operation)

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case ',':
      case ' ':
      case 'Enter':
        e.preventDefault()
        if (input.trim()) {
          if (isOperationAlreadyExistingAt(index, input)) {
            setIsEditable(false)
            return
          }
          if (isOperationAlreadyExisting(input)) return
          modifyOperation(index, input)
          setIsEditable(false)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsEditable(false)
        break
      default:
        break
    }
  }

  return (
    <>
      <input
        defaultValue={operation}
        style={{ width: `calc(${input.length}ch + 0.5rem)` }}
        onChange={(e) => setInput(e.target.value)}
        ref={secondaryInputRef}
        onKeyDown={handleOnKeyDown}
        className="px-1 bg-white outline-none font-mono"
      />
      <button
        type="button"
        className={'h-full px-1 border-l border-gray-500 -ml-px'}
        onClick={handleEditOperation}
      >
        <PencilIcon className="w-4 h-4" />
      </button>
    </>
  )
}
