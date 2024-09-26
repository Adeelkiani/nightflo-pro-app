import * as React from "react";
import Svg, { Path } from "react-native-svg";

function StartTimeSvg(props) {
  const { color } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M10 18.3333C5.97504 18.3333 2.70837 15.0667 2.70837 11.0417C2.70837 7.01667 5.97504 3.75 10 3.75C14.025 3.75 17.2917 7.01667 17.2917 11.0417"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10 6.6665V10.8332"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.5 1.6665H12.5"
        stroke={color ? color : "#00F0C5"}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.8334 14.1665V17.4998"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.3334 14.1665V17.4998"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default StartTimeSvg;
