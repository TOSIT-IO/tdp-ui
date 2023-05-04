import { Bars3CenterLeftIcon, EyeIcon } from '@heroicons/react/24/solid'

import { IconButon } from 'src/components/commons'
import { useAppSelector, useAppDispatch } from 'src/store'
import { setRawMode } from 'src/store/slices/userInput'

const Toolbar = () => {
  const {
    settings: { showRawMode },
  } = useAppSelector((state) => state.userInput)
  const dispatch = useAppDispatch()
  return (
    <div className="mb-4 flex justify-end ">
      <div className="inline-flex overflow-hidden rounded-md border border-gray-400">
        <IconButon
          onClick={() => {
            dispatch(setRawMode(true))
          }}
          isActive={showRawMode}
          icon={Bars3CenterLeftIcon}
          text="Raw"
        />
        <IconButon
          onClick={() => {
            dispatch(setRawMode(false))
          }}
          isActive={!showRawMode}
          className="-ml-px border-l border-l-gray-400"
          icon={EyeIcon}
          text="View"
        />
      </div>
    </div>
  )
}

export default Toolbar
