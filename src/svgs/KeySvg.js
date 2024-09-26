import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { GlobalConsts } from "../consts/GlobalConsts";

function KeySvg(props) {
  const { color, fill } = props;

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11 12C11 13.3807 9.88071 14.5 8.5 14.5C7.11929 14.5 6 13.3807 6 12C6 10.6193 7.11929 9.5 8.5 9.5C9.88071 9.5 11 10.6193 11 12Z"
        stroke={color ? color : GlobalConsts.Colors.primaryGreen}
        stroke-width="1.5"
      />
      <Path
        d="M11 12H15.5M15.5 12H17C17.5523 12 18 12.4477 18 13V14M15.5 12V13.5"
        stroke={color ? color : GlobalConsts.Colors.primaryGreen}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
        stroke={color ? color : GlobalConsts.Colors.primaryGreen}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}

export default KeySvg;
