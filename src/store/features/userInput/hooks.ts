import { useAppSelector } from 'src/store'

export const useSelectUserInput = () =>
  useAppSelector((state) => state.userInput)
