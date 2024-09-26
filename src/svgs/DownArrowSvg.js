import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DownArrowSvg(props) {
  const { color, fill } = props;

  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 73 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.425 37.296c0-19.63 15.71-35.512 35.051-35.512 19.342 0 35.052 15.883 35.052 35.512 0 19.63-15.71 35.513-35.052 35.513S1.425 56.926 1.425 37.296z"
        // fill="#3E3E50"
        fill={fill}
        stroke={color ? color : "#00F0C5"}
        strokeWidth={2.76721}
      />
      <Path
        d="M24.946 33.145l11.53 11.53 11.53-11.53"
        stroke={color ? color : "#00F0C5"}
        strokeWidth={3.92022}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DownArrowSvg;
