import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function SettingHelpSvg(props) {
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.75 18.65a.755.755 0 01-.752-.75v-5.7A9.906 9.906 0 0111.95 2.05 10.063 10.063 0 0121.998 12.1v5.7a.75.75 0 01-1.5 0v-5.7a8.559 8.559 0 00-8.548-8.55 8.4 8.4 0 00-8.452 8.63v5.71a.751.751 0 01-.748.76z"
        fill="url(#paint0_linear_82_1463)"
      />
      <Path
        d="M5.94 12.45h-.13A3.815 3.815 0 002 16.26v1.88a3.815 3.815 0 003.81 3.81h.13a3.815 3.815 0 003.81-3.81v-1.88a3.815 3.815 0 00-3.81-3.81z"
        fill="url(#paint1_linear_82_1463)"
      />
      <Path
        d="M18.19 12.45h-.13a3.815 3.815 0 00-3.81 3.81v1.88a3.815 3.815 0 003.81 3.81h.13A3.815 3.815 0 0022 18.14v-1.88a3.815 3.815 0 00-3.81-3.81z"
        fill="url(#paint2_linear_82_1463)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_82_1463"
          x1={11.9966}
          y1={22.8}
          x2={11.9966}
          y2={-0.284587}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F58AC9" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_82_1463"
          x1={5.875}
          y1={24.3252}
          x2={5.875}
          y2={11.1143}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F58AC9" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_82_1463"
          x1={18.125}
          y1={24.3252}
          x2={18.125}
          y2={11.1143}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SettingHelpSvg;
