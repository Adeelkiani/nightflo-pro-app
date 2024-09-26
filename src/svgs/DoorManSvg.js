import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DoorManSvg(props) {
  return (
    <Svg
      width={'50%'}
      height={'50%'}
      viewBox="0 0 56 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M47.25 36a8.25 8.25 0 018.25 8.25V47c0 10.843-10.227 22-27.5 22S.5 57.843.5 47v-2.75A8.25 8.25 0 018.75 36h38.5zM28 .25c8.353 0 15.125 6.772 15.125 15.125S36.353 30.5 28 30.5s-15.125-6.772-15.125-15.125S19.647.25 28 .25z"
        fill="#EC79DB"
      />
    </Svg>
  )
}

export default DoorManSvg
