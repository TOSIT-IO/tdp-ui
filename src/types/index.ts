import { Dispatch, SetStateAction } from 'react'

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

export type HookInfosType<T> = {
  initialInfos: T
  setNewVariables: Dispatch<SetStateAction<T>>
  sendVariables: (message: string) => void
}
