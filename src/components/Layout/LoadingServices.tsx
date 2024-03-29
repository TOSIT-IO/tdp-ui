import { useGetServicesApiV1ServiceGetQuery } from 'src/store/api/tdpApi'

export const LoadingServices = ({ children }) => {
  const { isLoading, isSuccess, error } = useGetServicesApiV1ServiceGetQuery()

  if (isSuccess) return children

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )

  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl">Error: {JSON.stringify(error)}</div>
      </div>
    )
}
