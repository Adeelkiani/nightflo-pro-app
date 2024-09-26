import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PromoterSvg(props) {
  return (
    <Svg
      width={'50%'}
      height={'50%'}
      viewBox="0 0 65 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.262 31.155L4.085 38.763a4.15 4.15 0 00-1.52 5.669l4.842 8.386a4.15 4.15 0 005.669 1.519l13.178-7.608-8.992-15.574z"
        fill="#EC79DB"
      />
      <Path
        opacity={0.4}
        d="M39.592 1.524a4.15 4.15 0 00-3.625 1.661L19.223 29.017l9.87 17.095 30.772-1.506a5.243 5.243 0 003.263-2.316 4.15 4.15 0 00-.146-3.877L42.876 3.59a4.15 4.15 0 00-3.284-2.065z"
        fill="#EC79DB"
      />
      <Path
        d="M28.296 48.744l-9.68 5.589 10.146 9.827a4.15 4.15 0 004.97.613l2.205-1.273a4.288 4.288 0 00.808-6.568l-8.45-8.188zM53.005 15.598l4.592 7.955a4.15 4.15 0 00.446-4.762l-.692-1.198a4.149 4.149 0 00-4.346-1.995z"
        fill="#EC79DB"
      />
    </Svg>
  )
}

export default PromoterSvg
