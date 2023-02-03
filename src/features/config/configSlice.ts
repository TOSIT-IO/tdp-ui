import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import configJson from '../../../config.json'

type Config = {
  apiBasePath: string
  oidc: {
    discoveryUrl: string
    redirectUri: string
    clientId: string
    scope: string
  }
}

const initialState = {
  value: {},
  status: 'loading',
  error: null,
} as {
  value: Config
  status: 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export const fetchConfig = createAsyncThunk('config/fetch', async () => {
  if (process.env.NODE_ENV === 'development') {
    return configJson
  } else {
    const response = await fetch('/config.json')
    return await response.json()
  }
})

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchConfig.fulfilled,
        (state, action: PayloadAction<Config>) => {
          state.value = action.payload
          state.status = 'succeeded'
        }
      )
      .addCase(fetchConfig.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })
  },
})

export default configSlice.reducer
