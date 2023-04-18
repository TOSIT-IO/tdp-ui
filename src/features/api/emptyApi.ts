import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_TDP_API_URL,
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
  }),
  endpoints: () => ({}),
})
