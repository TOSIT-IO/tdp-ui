import { useEffect } from 'react'

type Event = MouseEvent | TouchEvent

export function useOnClickOutside(
  ref: React.MutableRefObject<HTMLElement>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      // Call the handler only if the click is outside of the element passed.
      if (!ref.current || ref.current.contains((event.target as Node) || null))
        return
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
