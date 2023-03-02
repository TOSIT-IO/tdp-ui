import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
