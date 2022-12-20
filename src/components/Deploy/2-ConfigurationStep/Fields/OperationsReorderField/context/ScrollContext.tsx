import { createContext, useContext, useRef, useState } from 'react'

const ScrollContext = createContext<{
  divRef: React.MutableRefObject<HTMLDivElement>
  setNeedScrollDown: React.Dispatch<React.SetStateAction<boolean>>
  scrollDown: () => void
}>(null)

export const ScrollContextProvider = ({ children }) => {
  const [needScrollDown, setNeedScrollDown] = useState(true)
  const divRef = useRef<HTMLDivElement>(null)

  function scrollDown() {
    if (needScrollDown) divRef.current.scrollTop = divRef.current.scrollHeight
  }

  return (
    <ScrollContext.Provider value={{ divRef, setNeedScrollDown, scrollDown }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScrollContext() {
  const scrollContext = useContext(ScrollContext)
  if (!scrollContext)
    throw new Error(
      'useScrollContext() hook must be inside a ScrollContextProvider'
    )

  return scrollContext
}
