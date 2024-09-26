import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PlusSvg(props) {
  const { color } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <Path
        d="M4.58337 10.9997H17.4167M11 17.4163V4.58301"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default PlusSvg;
