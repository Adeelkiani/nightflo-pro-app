import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function BreakdownSvg(props) {
  const { color } = props;
  return (
    <Svg
      fill={color ? color : "#00F0C5"}
      width="24"
      height="18"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="m5 1h-2v11h2zm4 5h-2v6h2zm4-3h-2v9h2zm-12 10.6v1.4h14v-1.4z" />
    </Svg>
  );
}

export default BreakdownSvg;
