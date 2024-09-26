import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function HomeSvg(props) {
  return (
    <Svg
      width={'50%'}
      height={'50%'}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M126.731 62.102a3.721 3.721 0 00-3.438-2.297H83.435a3.72 3.72 0 00-2.63 1.09L63.506 78.192 46.21 60.895a3.721 3.721 0 00-2.631-1.09H3.72a3.72 3.72 0 00-2.631 6.352l18.838 18.839v38.316a3.721 3.721 0 003.721 3.721h79.715a3.721 3.721 0 003.721-3.721V84.996l18.839-18.839a3.722 3.722 0 00.807-4.055zM12.704 67.247h29.333l12.486 12.486H25.191L12.704 67.247zm47.082 52.344H27.37V87.176h32.415v32.415zm39.857 0H67.228V87.176h32.415v32.415zm2.18-39.858H72.49l12.487-12.486h29.332l-12.486 12.486z"
        fill="url(#paint0_linear_650_103)"
      />
      <Path
        opacity={0.4}
        d="M47.564 47.318a3.721 3.721 0 000-7.442c-12.591 0-18.326-6.21-18.326-11.981 0-4.22 3.202-8.477 10.354-8.477 8.005 0 13.826 6.412 17.302 19.058 2.848 10.358 2.892 20.96 2.892 21.066a3.721 3.721 0 007.442-.002c0-.468-.035-11.59-3.12-22.9-5.56-20.385-16.4-24.664-24.516-24.664-11.683 0-17.796 8.008-17.796 15.919 0 10.285 9.402 19.423 25.768 19.423z"
        fill="url(#paint1_linear_650_103)"
      />
      <Path
        opacity={0.4}
        d="M75.464 39.876a3.721 3.721 0 000 7.442c20.049 0 31.715-10.865 31.715-23.343 0-8.693-6.824-19.97-23.743-19.97a3.721 3.721 0 000 7.441c25.231.859 20.275 29.216-7.972 28.43z"
        fill="url(#paint2_linear_650_103)"
      />
      <Path
        d="M64.861 10.357c1.386 1.44 3.877 1.441 5.263 0l3.985-3.986c3.357-3.614-1.647-8.62-5.262-5.263l-1.355 1.355-1.354-1.355c-3.616-3.358-8.62 1.65-5.263 5.263l3.986 3.986z"
        fill="url(#paint3_linear_650_103)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_650_103"
          x1={63.507}
          y1={59.8046}
          x2={63.507}
          y2={127.033}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF63F1" />
          <Stop offset={1} stopColor="#F183D2" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_650_103"
          x1={44.512}
          y1={11.9758}
          x2={44.512}
          y2={63.2611}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF63F1" />
          <Stop offset={1} stopColor="#F183D2" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_650_103"
          x1={89.4609}
          y1={4.00412}
          x2={89.4609}
          y2={47.318}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF63F1" />
          <Stop offset={1} stopColor="#F183D2" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_650_103"
          x1={67.4924}
          y1={0}
          x2={67.4924}
          y2={11.4377}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF63F1" />
          <Stop offset={1} stopColor="#F183D2" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default HomeSvg
