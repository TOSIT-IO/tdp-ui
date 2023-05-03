import { createContext, useRef, useState } from 'react'

type ScrollContextValue = {
  divToScroll: React.MutableRefObject<HTMLDivElement>
  setEnableScrollDown: React.Dispatch<React.SetStateAction<boolean>>
  scrollDown: () => void
}

export const ScrollContext = createContext<ScrollContextValue>(null)

export const ScrollContextProvider = ({ children }) => {
  const [enableScrollDown, setEnableScrollDown] = useState(true)
  const divToScroll = useRef<HTMLDivElement>(null)

  const scrollDown = () => {
    if (enableScrollDown)
      divToScroll.current.scrollTop = divToScroll.current.scrollHeight
  }

  return (
    <ScrollContext.Provider
      value={{ divToScroll, setEnableScrollDown, scrollDown }}
    >
      {children}
    </ScrollContext.Provider>
  )
}
