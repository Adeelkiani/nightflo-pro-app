import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export default function EditSvg(props) {
  const { color } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M15.3333 9.33398H14C10.6667 9.33398 9.33333 10.6673 9.33333 14.0007V18.0007C9.33333 21.334 10.6667 22.6673 14 22.6673H18C21.3333 22.6673 22.6667 21.334 22.6667 18.0007V16.6673"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.6933 10.0135L13.44 15.2668C13.24 15.4668 13.04 15.8602 13 16.1468L12.7133 18.1535C12.6067 18.8802 13.12 19.3868 13.8467 19.2868L15.8533 19.0002C16.1333 18.9602 16.5267 18.7602 16.7333 18.5602L21.9867 13.3068C22.8933 12.4002 23.32 11.3468 21.9867 10.0135C20.6533 8.68017 19.6 9.10684 18.6933 10.0135Z"
        stroke={color ? color : "#00F0C5"}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.94 10.7676C18.3867 12.3609 19.6333 13.6076 21.2333 14.0609"
        stroke={color ? color : "#00F0C5"}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
