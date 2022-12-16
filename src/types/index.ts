import { Dispatch, SetStateAction } from 'react'

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

export type HookInfosType<T> = {
  initialVariables: Object
  setNewVariables: Dispatch<SetStateAction<T>>
  sendVariables: (message: string) => void
}
