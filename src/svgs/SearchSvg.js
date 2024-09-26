import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SearchSvg(props) {
  const { color } = props;
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.66671 13.9997C11.1645 13.9997 14 11.1641 14 7.66634C14 4.16854 11.1645 1.33301 7.66671 1.33301C4.1689 1.33301 1.33337 4.16854 1.33337 7.66634C1.33337 11.1641 4.1689 13.9997 7.66671 13.9997Z"
        stroke={color ? color : "#00F0C5"}
        stroke-opacity="0.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.6667 14.6663L13.3334 13.333"
        stroke={color ? color : "#00F0C5"}
        stroke-opacity="0.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default SearchSvg;
