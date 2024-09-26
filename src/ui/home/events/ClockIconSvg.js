import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ClockIconSvg(props) {
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.779 2.554a9.455 9.455 0 109.455 9.455 9.47 9.47 0 00-9.455-9.455zm4.113 12.83a.705.705 0 01-.974.246l-2.931-1.749a2.789 2.789 0 01-1.267-2.231V7.773a.71.71 0 111.418 0v3.877a1.396 1.396 0 00.577 1.011l2.931 1.75a.7.7 0 01.246.973z"
        fill="#fff"
        opacity={0.2}
      />
    </Svg>
  );
}

export default ClockIconSvg;
