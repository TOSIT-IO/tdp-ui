import axios from 'axios'
import { toast } from 'react-toastify'
import type { CreateAxiosDefaults, AxiosError } from 'axios'

export function createAxiosInstance(
  config: CreateAxiosDefaults<any>,
  accessToken?: string
) {
  const axiosInstance = axios.create(config)

  axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    } else {
      delete axiosInstance.defaults.headers.common.Authorization
    }
    return config
  })

  axiosInstance.interceptors.response.use(null, (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
      toast.error(err.response.data.detail, {
        theme: 'colored',
      })
      // Access to config, request, and response
    } else {
      // Just a stock error
    }
  })
  return axiosInstance
}
