import { useGetServicesApiV1ServiceGetQuery } from '../../features/api/tdpApi'

export function Loading({ children }) {
  const { isError, isLoading, isSuccess, error } =
    useGetServicesApiV1ServiceGetQuery()

  if (isSuccess) return children

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )

  if (isError)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl">Error: {error}</div>
      </div>
    )
}
