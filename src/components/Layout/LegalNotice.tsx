import Link from 'next/link'

export function LegalNotice() {
  const currentYear = new Date().getFullYear()

  const tositLink = (
    <Link
      className="text-gray-600 hover:underline"
      href={'https://github.com/TOSIT-IO'}
    >
      {'TOSIT'}
    </Link>
  )

  const apacheLink = (
    <Link
      className="text-gray-600 hover:underline"
      href={'https://www.apache.org/licenses/LICENSE-2.0'}
    >
      {'Apache-2.0'}
    </Link>
  )

  return (
    <p className="p-5 text-gray-500 text-sm text-center">
      &copy; {currentYear} {tositLink} | License {apacheLink}
    </p>
  )
}
