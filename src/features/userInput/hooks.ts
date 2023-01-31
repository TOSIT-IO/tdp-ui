import { useAppSelector } from 'src/store'

export const useSelectUserInput = (serviceId: string, componentId: string) => {
  const userInput = useAppSelector((state) => state.userInput)
  const service = userInput.find((s) => s.id === serviceId)
  if (!service) {
    return null
  }
  if (!componentId) {
    return service.variables
  }
  const component = service.components.find((c) => c.id === componentId)
  if (!component) {
    return null
  }
  return component.variables
}
