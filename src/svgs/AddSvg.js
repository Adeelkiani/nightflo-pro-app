import * as React from "react";
import Svg, { Path } from "react-native-svg";

function AddSvg(props) {
  const { color, size } = props;

  return (
    <Svg
      width={size ? size : "24"}
      height={size ? size : "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M4 12H20M12 4V20"
        stroke={color ? color : "#FFFFFF"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default AddSvg;
