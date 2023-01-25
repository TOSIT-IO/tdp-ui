import { useAppSelector } from 'src/store'

export const useSelectServices = () =>
  useAppSelector((state) => state.variables)
export const useSelectService = (serviceId: string) =>
  useAppSelector((state) => state.variables.value[serviceId])
export const useSelectComponent = (serviceId: string, componentId: string) =>
  useAppSelector(
    (state) => state.variables.value[serviceId].value.components[componentId]
  )
