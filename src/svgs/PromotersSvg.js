import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop } from "react-native-svg";

function PromotersSvg(props) {
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 118 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G opacity={0.34}>
        <Path
          opacity={0.4}
          d="M58.982 10.226a23.212 23.212 0 00-.587 46.415c.357-.05.72-.05 1.076 0h.343a23.213 23.213 0 00-.832-46.415z"
          fill="url(#paint0_linear_209_326)"
        />
        <Path
          d="M83.828 69.698a48.562 48.562 0 00-49.642 0 19.162 19.162 0 00-9.636 15.75 19.142 19.142 0 009.587 15.699 45.189 45.189 0 0024.846 6.896 45.189 45.189 0 0024.845-6.896 19.294 19.294 0 009.587-15.773 19.182 19.182 0 00-9.587-15.675zm-13.45 11.739L58.053 93.762a3.033 3.033 0 01-2.152.88 3.257 3.257 0 01-2.152-.88l-6.162-6.163a3.043 3.043 0 014.304-4.304l4.01 4.035 10.173-10.173a3.072 3.072 0 014.973.978 2.984 2.984 0 01-.669 3.302z"
          fill="url(#paint1_linear_209_326)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_209_326"
          x1={59.1148}
          y1={68.2447}
          x2={59.1148}
          y2={3.69817}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_209_326"
          x1={58.9825}
          y1={119.345}
          x2={58.9825}
          y2={56.523}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default PromotersSvg;
