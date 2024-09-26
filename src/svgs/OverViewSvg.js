import * as React from "react";
import Svg, { Path } from "react-native-svg";

function OverViewSvg(props) {
  const { color } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ? color : "#00F0C5"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <Path d="M12 13a1 1 0 100-2 1 1 0 000 2z" />
      <Path d="M21 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v3m18 8v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3" />
    </Svg>
  );
}

export default OverViewSvg;
