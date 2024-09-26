import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function SettingProfileSvg(props) {
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
        d="M12 2a4.746 4.746 0 00-.12 9.49.81.81 0 01.22 0h.07A4.746 4.746 0 0012 2z"
        fill="url(#paint0_linear_82_1458)"
      />
      <Path
        d="M17.08 14.15a9.929 9.929 0 00-10.15 0 3.947 3.947 0 00-1.97 3.23 3.914 3.914 0 001.96 3.21A9.24 9.24 0 0012 22a9.24 9.24 0 005.08-1.41 3.946 3.946 0 001.96-3.23 3.938 3.938 0 00-1.96-3.21z"
        fill="url(#paint1_linear_82_1458)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_82_1458"
          x1={12.0268}
          y1={13.8627}
          x2={12.0268}
          y2={0.665448}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F58AC9" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_82_1458"
          x1={12}
          y1={24.3131}
          x2={12}
          y2={11.4546}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F58AC9" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SettingProfileSvg;
