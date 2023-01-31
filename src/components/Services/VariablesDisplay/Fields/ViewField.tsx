import { ArrayList } from './ArrayList'
import { BooleanField } from './BooleanField'
import { StringNumberField } from './StringNumberField'

export function ViewField({
  property,
  value,
  dict,
}: {
  property: string
  value: string | number | boolean | any[]
  dict?: string
}) {
  if (value === null) return <p>null</p>
  switch (typeof value) {
    case 'undefined':
      return <p>undefined</p>
    case 'string':
    case 'number':
      return <StringNumberField property={property} value={value} dict={dict} />
    case 'boolean':
      return <BooleanField property={property} value={value} dict={dict} />
    case 'object':
      if (Array.isArray(value)) {
        return <ArrayList property={property} value={value} dict={dict} />
      }
    default:
      return <p>Type error</p>
  }
}
