import { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction } from 'react'

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

export type HookInfosType<T, U> = {
  initialInfos: T
  setNewVariables: Dispatch<SetStateAction<T>>
  sendVariables: (message: string) => Promise<AxiosResponse<U, any>>
}
