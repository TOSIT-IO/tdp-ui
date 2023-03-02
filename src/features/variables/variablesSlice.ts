import { Service, Component } from 'src/clients'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ComponentAsValue = {
  value: Component
  status: 'loading' | 'succeeded' | 'failed'
  error: string | null
}
type AugmentedService = Omit<Service, 'components'> & {
  components: ComponentAsValue[]
}
type ServiceAsValue = {
  value: AugmentedService
  status: 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState = {
  value: [],
  status: 'loading',
  error: null,
} as {
  value: ServiceAsValue[]
  status: 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setServicesValue: (state, action: PayloadAction<Service[]>) => {
      state.value = action.payload.map((s) => ({
        value: {
          ...s,
          components: s.components.map((c) => ({
            value: c,
            status: 'succeeded',
            error: null,
          })),
        },
        status: 'succeeded',
        error: null,
      }))
      state.status = 'succeeded'
      state.error = null
    },
    setServicesError: (state, action: PayloadAction<string>) => {
      state.status = 'failed'
      state.error = action.payload
    },
    setServicesLoading: (state) => {
      state.status = 'loading'
      state.error = null
    },
    setServiceValue: (state, action: PayloadAction<Service>) => {
      const { id } = action.payload
      state.value.find((s) => s.value.id === id).value = {
        ...action.payload,
        components: action.payload.components.map((c) => ({
          value: c,
          status: 'succeeded',
          error: null,
        })),
      }
      state.value.find((s) => s.value.id === id).status = 'succeeded'
      state.value.find((s) => s.value.id === id).error = null
    },
    setServiceError: (
      state,
      action: PayloadAction<{ serviceId: string; error: string }>
    ) => {
      const { serviceId, error } = action.payload
      state.value.find((s) => s.value.id === serviceId).status = 'failed'
      state.value.find((s) => s.value.id === serviceId).error = error
    },
    setServiceLoading: (
      state,
      action: PayloadAction<{ serviceId: string }>
    ) => {
      const { serviceId } = action.payload
      state.value.find((s) => s.value.id === serviceId).status = 'loading'
      state.value.find((s) => s.value.id === serviceId).error = null
    },
    setComponentValue: (state, action: PayloadAction<Component>) => {
      const { serviceId, id: componentId } = action.payload
      state.value
        .find((s) => s.value.id === serviceId)
        .value.components.find((c) => c.value.id === componentId).value =
        action.payload
      state.value
        .find((s) => s.value.id === serviceId)
        .value.components.find((c) => c.value.id === componentId).status =
        'succeeded'
      state.value
        .find((s) => s.value.id === serviceId)
        .value.components.find((c) => c.value.id === componentId).error = null
    },
    setComponentError: (
      state,
      action: PayloadAction<{
        serviceId: string
        componentId: string
        error: string
      }>
    ) => {
      const { serviceId, componentId, error } = action.payload
      state.value
        .find((s) => s.value.id === serviceId)
        .value.components.find((c) => c.value.id === componentId).status =
        'failed'
      state.value
        .find((s) => s.value.id === serviceId)
        .value.components.find((c) => c.value.id === componentId).error = error
    },
    setComponentLoading: (
      state,
      action: PayloadAction<{ serviceId: string; componentId: string }>
    ) => {
      const { serviceId, componentId } = action.payload
      state.value
        .find((s) => s.value.id === serviceId)
        .value.components.find((c) => c.value.id === componentId).status =
        'loading'
      state.value
        .find((s) => s.value.id === serviceId)
        .value.components.find((c) => c.value.id === componentId).error = null
    },
  },
})

export default configSlice.reducer

export const {
  setServicesValue,
  setServicesError,
  setServicesLoading,
  setServiceValue,
  setServiceError,
  setServiceLoading,
  setComponentValue,
  setComponentError,
  setComponentLoading,
} = configSlice.actions
