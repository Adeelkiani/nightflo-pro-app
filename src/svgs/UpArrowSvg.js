import * as React from "react";
import Svg, { Path } from "react-native-svg";

function UpArrowSvg(props) {
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
        d="M71.528 37.651c0 19.63-15.71 35.513-35.052 35.513-19.341 0-35.05-15.883-35.05-35.513S17.133 2.14 36.475 2.14c19.343 0 35.052 15.883 35.052 35.512z"
        fill={fill}
        stroke={color ? color : "#00F0C5"}
        strokeWidth={2.76721}
      />
      <Path
        d="M48.006 41.802l-11.53-11.53-11.53 11.53"
        stroke={color ? color : "#00F0C5"}
        strokeWidth={3.92022}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default UpArrowSvg;
