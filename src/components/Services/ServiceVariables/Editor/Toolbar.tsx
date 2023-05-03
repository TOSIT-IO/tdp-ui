import { Bars3CenterLeftIcon, EyeIcon } from '@heroicons/react/24/solid'

import { IconButon } from 'src/components/commons'

const DisplayModeButton = ({
  isRawMode,
  showRawMode,
  showVisualMode,
}: {
  isRawMode: boolean
  showRawMode: () => void
  showVisualMode: () => void
}) => (
  <div className="inline-flex overflow-hidden rounded-md border border-gray-400">
    <IconButon
      onClick={showRawMode}
      isActive={isRawMode}
      icon={Bars3CenterLeftIcon}
      text="Raw"
    />
    <IconButon
      onClick={showVisualMode}
      isActive={!isRawMode}
      className="-ml-px border-l border-l-gray-400"
      icon={EyeIcon}
      text="View"
    />
  </div>
)

const Toolbar = ({
  isRawMode,
  showRawMode,
  showVisualMode,
}: {
  isRawMode: boolean
  showRawMode: () => void
  showVisualMode: () => void
}) => (
  <div className="mb-4 flex justify-end ">
    <DisplayModeButton
      isRawMode={isRawMode}
      showRawMode={showRawMode}
      showVisualMode={showVisualMode}
    />
  </div>
)

export default Toolbar
