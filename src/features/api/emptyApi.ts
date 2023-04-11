import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_TDP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from redux state
      // const token = getState().user.access_token
      // if (token) {
      // headers.set('authorization', `Bearer ${token}`)
      // }
      return headers
    },
  }),
  endpoints: () => ({}),
})
