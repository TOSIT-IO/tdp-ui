import { Service, Component } from 'src/clients'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ComponentAsValue = {
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
        value: [...s.components].reduce(
          (acc, c) => ({
            ...acc,
            components: [
              ...acc.components,
              {
                value: c,
                status: 'succeeded',
                error: null,
              },
            ],
          }),
          { ...s, components: [] }
        ),
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
      state.value[id].value = {
        ...action.payload,
        components: [...action.payload.components].reduce(
          (acc, c) => ({
            ...acc,
            components: [
              ...acc.components,
              {
                value: c,
                status: 'succeeded',
                error: null,
              },
            ],
          }),
          { ...action.payload, components: [] }
        ),
      }
      state.value[id].status = 'succeeded'
      state.value[id].error = null
    },
    setServiceError: (
      state,
      action: PayloadAction<{ serviceId: string; error: string }>
    ) => {
      const { serviceId, error } = action.payload
      state.value[serviceId].status = 'failed'
      state.value[serviceId].error = error
    },
    setServiceLoading: (
      state,
      action: PayloadAction<{ serviceId: string }>
    ) => {
      const { serviceId } = action.payload
      state.value[serviceId].status = 'loading'
      state.value[serviceId].error = null
    },
    setComponentValue: (state, action: PayloadAction<Component>) => {
      const { serviceId, id } = action.payload
      state.value[serviceId].value.components[id].value = action.payload
      state.value[serviceId].value.components[id].status = 'succeeded'
      state.value[serviceId].value.components[id].error = null
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
      state.value[serviceId].value.components[componentId].status = 'failed'
      state.value[serviceId].value.components[componentId].error = error
    },
    setComponentLoading: (
      state,
      action: PayloadAction<{ serviceId: string; componentId: string }>
    ) => {
      const { serviceId, componentId } = action.payload
      state.value[serviceId].value.components[componentId].status = 'loading'
      state.value[serviceId].value.components[componentId].error = null
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
