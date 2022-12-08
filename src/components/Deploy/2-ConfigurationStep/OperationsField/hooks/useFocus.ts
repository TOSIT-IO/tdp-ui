import { useRef, useState, useCallback, useEffect } from 'react'

export function useFocus() {
  const mainRef = useRef<HTMLInputElement>(null)
  const [secondaryRef, setSecondaryRef] =
    useState<React.MutableRefObject<HTMLInputElement>>(null)

  const setFocus = useCallback(() => {
    if (secondaryRef && secondaryRef.current) {
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
