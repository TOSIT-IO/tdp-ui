import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store'
import { fetchConfig } from './configSlice'

export const LoadingConfig = ({ children }) => {
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector((state) => state.config)

  useEffect(() => {
    dispatch(fetchConfig())
  }, [dispatch])

  if (status === 'succeeded') return children

  if (status === 'loading')
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )

  if (status === 'failed')
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl">Error: {error}</div>
      </div>
    )
}
