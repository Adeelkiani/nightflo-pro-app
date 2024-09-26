import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop } from "react-native-svg";

function DoorTeamSvg(props) {
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G opacity={0.3}>
        <Path
          opacity={0.4}
          d="M44.949 19.961a1.877 1.877 0 00-.535 0 7.381 7.381 0 11.535 0z"
          fill="url(#paint0_linear_209_330)"
        />
        <Path
          opacity={0.4}
          d="M53.245 37.599a15.802 15.802 0 01-10.537 2.138 16.62 16.62 0 001.502-6.847 15.64 15.64 0 00-1.629-7.075c3.684-.567 7.45.181 10.639 2.112a5.393 5.393 0 01.025 9.672z"
          fill="url(#paint1_linear_209_330)"
        />
        <Path
          opacity={0.4}
          d="M16.723 19.961c.177-.025.357-.025.534 0a7.343 7.343 0 10-.534 0z"
          fill="url(#paint2_linear_209_330)"
        />
        <Path
          opacity={0.4}
          d="M17.003 32.89a16.575 16.575 0 001.502 6.923c-3.51.424-7.06-.347-10.079-2.189a5.406 5.406 0 010-9.697 15.63 15.63 0 0110.18-2.163 16.183 16.183 0 00-1.603 7.126z"
          fill="url(#paint3_linear_209_330)"
        />
        <Path
          d="M31.18 40.577a2.872 2.872 0 00-.662 0 8.78 8.78 0 11.661 0z"
          fill="url(#paint4_linear_209_330)"
        />
        <Path
          d="M22.905 45.845a5.226 5.226 0 000 9.34 15.553 15.553 0 0015.932 0 5.225 5.225 0 000-9.34 15.553 15.553 0 00-15.932 0z"
          fill="url(#paint5_linear_209_330)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_209_330"
          x1={44.6812}
          y1={23.6506}
          x2={44.6812}
          y2={3.12942}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_209_330"
          x1={49.4095}
          y1={43.4762}
          x2={49.4095}
          y2={23.6227}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_209_330"
          x1={16.9901}
          y1={23.6313}
          x2={16.9901}
          y2={3.21633}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_209_330"
          x1={12.0088}
          y1={43.5}
          x2={12.0088}
          y2={23.6217}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_209_330"
          x1={30.8485}
          y1={44.9657}
          x2={30.8485}
          y2={20.5533}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint5_linear_209_330"
          x1={30.871}
          y1={60.8131}
          x2={30.871}
          y2={41.719}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default DoorTeamSvg;
