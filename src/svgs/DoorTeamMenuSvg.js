import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { GlobalConsts } from "../consts/GlobalConsts";

function DoorTeamMenuSvg(props) {
  const { color } = props;
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 23 24"
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        opacity={0.4}
        stroke={color ? color : "#00F0C5"}
        strokeWidth={1.40942}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M16.913 7.339a.568.568 0 00-.178 0 2.429 2.429 0 11.178 0v0zM15.945 14.18a5.295 5.295 0 003.702-.677 1.796 1.796 0 000-3.214 5.327 5.327 0 00-3.73-.667" />
      </G>
      <Path
        opacity={0.4}
        d="M5.61 7.339c.059-.01.119-.01.178 0a2.429 2.429 0 10-.179 0v0zM6.58 14.18a5.295 5.295 0 01-3.702-.677 1.796 1.796 0 010-3.214 5.327 5.327 0 013.727-.667"
        stroke={color ? color : "#00F0C5"}
        strokeWidth={1.40942}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.275 14.358a.568.568 0 00-.178 0 2.428 2.428 0 11.178 0v0zM8.541 17.317a1.796 1.796 0 000 3.214 5.334 5.334 0 005.469 0 1.796 1.796 0 000-3.213 5.377 5.377 0 00-5.469 0v0z"
        stroke={color ? color : "#00F0C5"}
        strokeWidth={1.40942}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DoorTeamMenuSvg;
