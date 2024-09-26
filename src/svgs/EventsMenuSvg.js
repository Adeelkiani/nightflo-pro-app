import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { GlobalConsts } from "../consts/GlobalConsts";

function EventsMenuSvg(props) {
  const { color } = props;

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8 2V5"
        stroke={color ? color : "#00F0C5"}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16 2V5"
        stroke={color ? color : "#00F0C5"}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.5 9.08984H20.5"
        stroke={color ? color : "#00F0C5"}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
        stroke={color ? color : "#00F0C5"}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.9955 13.7002H12.0045"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.29431 13.7002H8.30329"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.29431 16.7002H8.30329"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default EventsMenuSvg;
