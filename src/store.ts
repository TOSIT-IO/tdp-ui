import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import configReducer from './features/config/configSlice'
import userInputReducer from './features/userInput/userInputSlice'
import { emptyApi } from './features/api/emptyApi'
import { rtkQueryErrorLogger } from './middlewares/rtkLogger'

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

setupListeners(store.dispatch) // optional

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
