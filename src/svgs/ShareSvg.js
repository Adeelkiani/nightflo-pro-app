import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { GlobalConsts } from "../consts/GlobalConsts";

export default function ShareSvg(props) {
  const { color } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M8.66666 7.33337L14.1333 1.8667"
        stroke={color ? color : GlobalConsts.Colors.primaryGreen}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.6667 4.5335V1.3335H11.4667"
        stroke={color ? color : GlobalConsts.Colors.primaryGreen}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.33334 1.3335H6.00001C2.66668 1.3335 1.33334 2.66683 1.33334 6.00016V10.0002C1.33334 13.3335 2.66668 14.6668 6.00001 14.6668H10C13.3333 14.6668 14.6667 13.3335 14.6667 10.0002V8.66683"
        stroke={color ? color : GlobalConsts.Colors.primaryGreen}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
