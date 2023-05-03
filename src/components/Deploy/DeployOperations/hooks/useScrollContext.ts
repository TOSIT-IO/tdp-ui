import { useContext } from 'react'
import { ScrollContext } from '../context'

/**
 * Hook to access the ScrollContext.
 * @returns The scroll context
 * @throws Error if used outside of a ScrollContextProvider
 * @see ScrollContext
 */
export const useScrollContext = () => {
  const scrollContext = useContext(ScrollContext)
  if (!scrollContext)
    throw new Error(
      'useScrollContext() hook must be inside a ScrollContextProvider'
    )

  return scrollContext
}
