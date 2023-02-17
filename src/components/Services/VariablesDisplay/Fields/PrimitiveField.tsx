import { Sidebar } from 'src/components/Layout'
import { ArrayList } from './ArrayList'
import { BooleanField } from './BooleanField'
import { StringNumberField } from './StringNumberField'

export function PrimitiveField({
  property,
  value,
  dictId,
}: {
  property: string
  value: string | number | boolean | any[]
  dictId?: string
}) {
  return (
    <Sidebar
      key={property}
      className="text-gray-600 text-sm"
      space="0"
      sideWidth="17rem"
    >
      <p className="w-20 font-bold overflow-auto">{property}:</p>
      <div className="w-full">
        {getPrimitiveField({ dictId, property, value })}
      </div>
    </Sidebar>
  )
}

function getPrimitiveField({
  dictId,
  property,
  value,
}: {
  dictId?: string
  property: string
  value: any
}) {
  if (value === null) return <p>null</p>
  switch (typeof value) {
    case 'undefined':
      return <p>undefined</p>
    case 'string':
    case 'number':
      return (
        <StringNumberField property={property} value={value} dict={dictId} />
      )
    case 'boolean':
      return <BooleanField property={property} value={value} dict={dictId} />
    case 'object':
      if (Array.isArray(value)) {
        return <ArrayList property={property} value={value} dict={dictId} />
      }
      return (
        <StringNumberField property={property} value={value} dict={dictId} />
      )
    default:
      return <p>Type error</p>
  }
}
