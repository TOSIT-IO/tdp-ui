import axios, { CreateAxiosDefaults } from 'axios'

export function createAxiosInstance(
  config: CreateAxiosDefaults<any>,
  accessToken?: string
) {
  const axiosInstance = axios.create(config)

  console.log(accessToken)

  axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    } else {
      delete axiosInstance.defaults.headers.common.Authorization
    }
    return config
  })

  return axiosInstance
}
