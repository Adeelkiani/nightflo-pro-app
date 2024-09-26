import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export default function ReportSvg(props) {
  const { color } = props;
  return (
    <Svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M21.19 7H12.81C9.17 7 7 9.17 7 12.81V21.18C7 24.83 9.17 27 12.81 27H21.18C24.82 27 26.99 24.83 26.99 21.19V12.81C27 9.17 24.83 7 21.19 7ZM14.91 21.19C14.91 21.83 14.39 22.35 13.74 22.35C13.1 22.35 12.58 21.83 12.58 21.19V17.93C12.58 17.29 13.1 16.77 13.74 16.77C14.39 16.77 14.91 17.29 14.91 17.93V21.19ZM21.42 21.19C21.42 21.83 20.9 22.35 20.26 22.35C19.61 22.35 19.09 21.83 19.09 21.19V12.81C19.09 12.17 19.61 11.65 20.26 11.65C20.9 11.65 21.42 12.17 21.42 12.81V21.19Z"
        fill={color ? color : "#00F0C5"}
      />
    </Svg>
  );
}
