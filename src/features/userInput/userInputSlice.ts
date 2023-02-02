import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type userInput = {
  id: string
  variables?: Object
  components?: {
    id: string
    variables: Object
  }[]
}

const initialState = {} as userInput

export const userInputSlice = createSlice({
  name: 'userInput',
  initialState,
  reducers: {
    clearUserInput: () => initialState,
    setProperty: (
      state,
      action: PayloadAction<{
        serviceId: string
        componentId?: string
        property: string
        value: any
      }>
    ) => {
      if (action.payload.componentId) {
        userInputSlice.caseReducers.setComponentProperty(state, {
          type: 'setComponentProperty',
          payload: {
            serviceId: action.payload.serviceId,
            componentId: action.payload.componentId,
            property: action.payload.property,
            value: action.payload.value,
          },
        })
      } else {
        userInputSlice.caseReducers.setServiceProperty(state, action)
      }
    },
    setServiceProperty: (
      state,
      action: PayloadAction<{
        serviceId: string
        property: string
        value: any
      }>
    ) => {
      const { serviceId, property, value } = action.payload
      if (!state.id) {
        state.id = serviceId
        state.variables = {}
      }
      if (state.id !== serviceId) {
        throw new Error(
          `ServiceId mismatch: ${serviceId} does not match ${state.id}`
        )
      }
      state.variables[property] = value
    },
    setComponentProperty: (
      state,
      action: PayloadAction<{
        serviceId: string
        componentId: string
        property: string
        value: any
      }>
    ) => {
      const { serviceId, componentId, property, value } = action.payload
      if (!state.id) {
        state.id = serviceId
        state.variables = {}
      }
      if (!state.components) {
        state.components = []
      }
      if (state.id !== serviceId) {
        throw new Error(
          `ServiceId mismatch: ${serviceId} does not match ${state.id}`
        )
      }
      const component = state.components.find(
        (component) => component.id === componentId
      )
      if (component) {
        component.variables[property] = value
      } else {
        state.components.push({
          id: componentId,
          variables: {
            [property]: value,
          },
        })
      }
    },
  },
})

export const { setProperty, clearUserInput } = userInputSlice.actions

export default userInputSlice.reducer
