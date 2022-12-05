import { Raw } from './Raw'
import { ArrayList } from './ArrayList'
import { BooleanField } from './BooleanField'
import { StringNumberField } from './StringNumberField'

interface VariableFieldType {
  isRaw: boolean
  prop: string
  value: string | number | boolean | any[]
  parent?: string
}

export function VariableField({
  prop,
  value,
  parent,
  isRaw,
}: VariableFieldType) {
  const inputName = parent ? [parent, prop].join('.') : prop
  if (isRaw) {
    return (
      <div className="flex flex-col gap-2">
        <Raw prop={prop} value={value} parent={parent} />
      </div>
    )
  } else {
    return (
      <div className="grid grid-cols-10 divide-y grid-flow-row gap-1 p-0 bg-transparent">
        <div
          key={inputName}
          className="col-start-1 col-span-2 flex flex-grow flex-col bg-transparent p-0 font-bold mr-0 text-base text-gray-600 sm:pl-0 overflow-auto "
        >
          {inputName}:
        </div>
        <div
          key={inputName}
          className="col-start-3 col-span-8 flex flex-grow flex-col bg-transparent px-0 py-0 text-base text-gray-600"
        >
          <ViewValue prop={prop} value={value} parent={parent} />
        </div>
      </div>
    )
  }
}

interface ViewValueType {
  prop: string
  value: string | number | boolean | any[]
  parent?: string
}

function ViewValue({ prop, value, parent }: ViewValueType) {
  switch (getType(value)) {
    case getTypeEnum.ARRAY:
      return <ArrayList prop={prop} value={value} parent={parent} />
    case getTypeEnum.BOOLEAN:
      return <BooleanField prop={prop} value={value} parent={parent} />
    case getTypeEnum.STRING:
    case getTypeEnum.NUMBER:
      return <StringNumberField prop={prop} value={value} parent={parent} />
    default:
      return <p>Type error</p>
  }
}

enum getTypeEnum {
  UNDEFINED = 'undefined',
  NULL = 'null',
  ARRAY = 'array',
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

function getType(v: any): getTypeEnum {
  if (v === undefined) {
    return getTypeEnum.UNDEFINED
  } else if (v === null) {
    return getTypeEnum.NULL
  } else if (Array.isArray(v)) {
    return getTypeEnum.ARRAY
  } else if (typeof v === 'string') {
    return getTypeEnum.STRING
  } else if (typeof v === 'number') {
    return getTypeEnum.NUMBER
  } else if (typeof v === 'boolean') {
    return getTypeEnum.BOOLEAN
  }
}
