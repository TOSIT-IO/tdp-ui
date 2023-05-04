import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import configReducer from './slices/config'
import userInputReducer from './slices/userInput'
import { emptyApi } from './api/emptyApi'
import { rtkQueryErrorLogger } from './middlewares/logger'

const store = configureStore({
  reducer: {
    config: configReducer,
    userInput: userInputReducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(emptyApi.middleware)
      .concat(rtkQueryErrorLogger),
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
