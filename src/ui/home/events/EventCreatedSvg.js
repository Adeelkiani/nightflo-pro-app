import * as React from "react";
import Svg, {
  G,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function EventCreatedSvg(props) {
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 151 151"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_692_108)">
        <Circle
          cx={75.5}
          cy={71.5}
          r={63.5}
          fill="url(#paint0_linear_692_108)"
        />
      </G>
      <Path
        opacity={0.3}
        d="M101 69.702v2.3a24.999 24.999 0 01-45.973 13.593 25 25 0 0131.148-36.443"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M101 52.002L76 77.027l-7.5-7.5"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_692_108"
          x1={-4062.61}
          y1={60.8537}
          x2={-4062.54}
          y2={2.69213}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#FF9CBA" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default EventCreatedSvg;
