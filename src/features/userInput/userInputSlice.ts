import { createSlice } from '@reduxjs/toolkit'
import { Service } from 'src/clients'

const initialState = [] as Service[]

export const userInputSlice = createSlice({
  name: 'userInput',
  initialState,
  reducers: {
    setServiceProperty: (state, action) => {
      const { serviceId, property, value } = action.payload
      const serviceIndex = state.findIndex((s) => s.id === serviceId)
      state[serviceIndex].variables[property] = value
    },
    setComponentProperty: (state, action) => {
      const { serviceId, componentId, property, value } = action.payload
      const serviceIndex = state.findIndex((s) => s.id === serviceId)
      const componentIndex = state[serviceIndex].components.findIndex(
        (c) => c.id === componentId
      )
      state[serviceIndex].components[componentIndex].variables[property] = value
    },
  },
})

export const { setServiceProperty, setComponentProperty } =
  userInputSlice.actions

export default userInputSlice.reducer
