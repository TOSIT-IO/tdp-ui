import Image from 'next/image'

type TdpUiLogoProps = {
  width: number
  height: number
}

export function TdpUiLogo({ width, height }: TdpUiLogoProps) {
  return (
    <div className="flex">
      <Image
        src="/TDP_LOGO_INVERSE_notext.png"
        alt="tdp-logo"
        width={width}
        height={height}
      />
      <span className="text-lg font-bold text-white">UI</span>
    </div>
  )
}
