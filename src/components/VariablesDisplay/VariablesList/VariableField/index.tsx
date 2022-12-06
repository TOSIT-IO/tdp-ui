import { ArrayList } from './ArrayList'
import { BooleanField } from './BooleanField'
import { StringNumberField } from './StringNumberField'

interface ViewValueType {
  prop: string
  value: string | number | boolean | any[]
  parent?: string
}

export function ViewValue({ prop, value, parent }: ViewValueType) {
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
