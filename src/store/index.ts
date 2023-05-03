import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import configReducer from './config/configSlice'
import userInputReducer from './userInput/userInputSlice'
import { emptyApi } from './api/emptyApi'
import { rtkQueryErrorLogger } from './middlewares'

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
