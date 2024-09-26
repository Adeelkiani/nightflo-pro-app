import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LocationIconSvg(props) {
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
        opacity={1}
        d="M17.391 6.86A8.156 8.156 0 009.241.525h-.01a8.154 8.154 0 00-8.15 6.325c-1.106 4.879 1.882 9.01 4.586 11.611a5.127 5.127 0 007.138 0c2.705-2.6 5.692-6.722 4.586-11.601zm-8.15 4.737a2.978 2.978 0 110-5.957 2.978 2.978 0 010 5.957z"
        fill="#00F0C5"
      />
    </Svg>
  );
}

export default LocationIconSvg;
