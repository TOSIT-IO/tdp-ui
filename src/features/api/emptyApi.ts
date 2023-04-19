import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { User } from 'oidc-client-ts'

import type { RootState } from 'src/store'
import type { Config } from 'src/features/config'

const getUser = async (oidc: Config['oidc']) => {
  // TODO: refactor to RTK Query and fetch `issuer` from `oidc.discoveryUrl`
  const authority = oidc.discoveryUrl.replace(
    '/.well-known/openid-configuration',
    ''
  )
  const oidcStorage = localStorage.getItem(
    `oidc.user:${authority}:${oidc.clientId}`
  )
  if (!oidcStorage) return null
  return User.fromStorageString(oidcStorage)
}

const rawBaseQuery = fetchBaseQuery({
  prepareHeaders: async (headers, { getState }) => {
    // provision with a Bearer token if OIDC is configured
    const {
      config: {
        value: { oidc },
      },
    }: Partial<RootState> = getState()
    if (oidc) {
      const user = await getUser(oidc)
      const token = user?.access_token
      if (token) headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let {
    config: {
      value: { apiBasePath },
    },
  }: Partial<RootState> = api.getState()
  // gracefully handle scenarios where data to generate the URL is missing
  if (!apiBasePath) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No apiBasePath received',
      },
    }
  }
  apiBasePath = apiBasePath.replace(/\/*$/, '') // replace "/" at the end if exists
  const urlEnd = typeof args === 'string' ? args : args.url
  // construct a dynamically generated portion of the url
  const adjustedUrl = `${apiBasePath}${urlEnd}`
  const adjustedArgs =
    typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl }
  // provide the amended url and other params to the raw base query
  return rawBaseQuery(adjustedArgs, api, extraOptions)
}

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
})
