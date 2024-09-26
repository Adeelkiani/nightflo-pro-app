import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function ClockSvg(props) {
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.42.072a9.42 9.42 0 109.42 9.42A9.435 9.435 0 009.42.073zm4.098 12.784a.703.703 0 01-.97.245l-2.92-1.743a2.779 2.779 0 01-1.263-2.223V5.272a.707.707 0 011.413 0v3.863a1.392 1.392 0 00.575 1.008l2.92 1.742a.698.698 0 01.245.97z"
        fill="url(#paint0_linear_209_282)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_209_282"
          x1={9.42029}
          y1={0.0724487}
          x2={9.42029}
          y2={18.913}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F182D2" />
          <Stop offset={1} stopColor="#E166ED" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default ClockSvg;
