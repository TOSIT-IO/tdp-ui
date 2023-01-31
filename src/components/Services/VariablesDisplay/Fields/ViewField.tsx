import { ArrayList } from './ArrayList'
import { BooleanField } from './BooleanField'
import { StringNumberField } from './StringNumberField'

export function ViewField({
  prop,
  value,
  parent,
}: {
  prop: string
  value: string | number | boolean | any[]
  parent?: string
}) {
  if (value === undefined) return <p>undefined</p>
  if (value === null) return <p>null</p>
  switch (typeof value) {
    case 'string':
    case 'number':
      return <StringNumberField prop={prop} value={value} parent={parent} />
    case 'boolean':
      return <BooleanField prop={prop} value={value} parent={parent} />
    case 'object':
      if (Array.isArray(value)) {
        return <ArrayList prop={prop} value={value} parent={parent} />
      }
    default:
      return <p>Type error</p>
  }
}
