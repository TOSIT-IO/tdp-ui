import { useAppSelector } from 'src/store'

export const useSelectServices = () =>
  useAppSelector((state) => state.variables)
export const useSelectService = (serviceId: string) =>
  useAppSelector((state) =>
    state.variables.value.find((service) => service.value.id === serviceId)
  )
export const useSelectComponent = (serviceId: string, componentId: string) =>
  useAppSelector((state) =>
    state.variables.value
      .find((service) => service.value.id === serviceId)
      .value.components.find((component) => component.value.id === componentId)
  )
