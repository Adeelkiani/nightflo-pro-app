import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { GlobalConsts } from "../consts/GlobalConsts";

function RightArrowSvg(props) {
  const { color } = props;
  return (
    <Svg
      width={"32"}
      height={"32"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 17L15 12L10 7"
        stroke={color ? color : GlobalConsts.Colors.primaryGreen}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default RightArrowSvg;
