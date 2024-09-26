import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EventFlyerSvg(props) {
  return (
    <Svg
      width={'50%'}
      height={'50%'}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M30.083 4.75H7.917A3.167 3.167 0 004.75 7.917v22.166a3.167 3.167 0 003.167 3.167h22.166a3.167 3.167 0 003.167-3.167V7.917a3.167 3.167 0 00-3.167-3.167z"
        stroke="#ED7CD8"
        strokeWidth={2.17}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity={0.3}
        d="M13.458 15.833a2.375 2.375 0 100-4.75 2.375 2.375 0 000 4.75zM33.25 23.75l-7.917-7.917L7.917 33.25"
        stroke="#ED7CD8"
        strokeWidth={2.17}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default EventFlyerSvg
