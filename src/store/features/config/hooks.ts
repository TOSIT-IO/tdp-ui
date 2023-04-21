import { useAppSelector } from 'src/store'

export const useSelectConfig = () => useAppSelector((state) => state.config)
