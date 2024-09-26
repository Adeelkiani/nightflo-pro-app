import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CrossSvg(props) {
  const { color, size } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "24"}
      height={size ? size : "24"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M7.05334 12.9464L12.9467 7.05469M7.05334 7.05469L12.9467 12.9464"
        stroke={color ? color : "#000000"}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}

export default CrossSvg;
