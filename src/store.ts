import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import configReducer from './features/config/configSlice'
import variablesReducer from './features/variables/variablesSlice'
import userInputReducer from './features/userInput/userInputSlice'
// RTK Query
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { emptyApi } from './services/emptyApi'

const store = configureStore({
  reducer: {
    config: configReducer,
    variables: variablesReducer,
    userInput: userInputReducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyApi.middleware),
})

setupListeners(store.dispatch) // optional

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
