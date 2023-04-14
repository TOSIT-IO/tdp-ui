import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type userInput = {
  id: string
  variables?: Object
  components?: {
    id: string
    variables: Object
  }[]
  settings: {
    showUnusedTabs: boolean
    showRawMode: boolean
  }
}

const initialState = {
  components: [],
  settings: { showUnusedTabs: false, showRawMode: false },
} as userInput

export const userInputSlice = createSlice({
  name: 'userInput',
  initialState,
  reducers: {
    clearUserInput: (state) => {
      state.components = []
      delete state.variables
      delete state.id
    },
    setServiceId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    setServiceVariables: (state, action: PayloadAction<Object>) => {
      const isVariablesEmpty = Object.keys(action.payload).length === 0
      if (isVariablesEmpty) return
      state.variables = action.payload
    },
    setComponent: (
      state,
      action: PayloadAction<{
        componentId: string
        variables: Object
      }>
    ) => {
      const { componentId, variables } = action.payload
      const isVariablesEmpty = Object.keys(variables).length === 0
      if (isVariablesEmpty) return
      const component = state.components.find(
        (component) => component.id === componentId
      )
      if (component) {
        component.variables = variables
      } else {
        state.components.push({
          id: componentId,
          variables,
        })
      }
    },
    toogleShowUnusedTabs: (state) => {
      state.settings.showUnusedTabs = !state.settings.showUnusedTabs
    },
    setRawMode: (state, action: PayloadAction<boolean>) => {
      state.settings.showRawMode = action.payload
    },
  },
})

export const {
  clearUserInput,
  setServiceId,
  setServiceVariables,
  setComponent,
  toogleShowUnusedTabs,
  setRawMode,
} = userInputSlice.actions

export default userInputSlice.reducer
