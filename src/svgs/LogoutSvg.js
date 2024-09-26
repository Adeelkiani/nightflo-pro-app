import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { GlobalConsts } from "../consts/GlobalConsts";

export default function LogoutSvg(props) {
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
        d="M14 1.66602H11.8333C9.16667 1.66602 7.5 3.33268 7.5 5.99935V9.37435H12.7083C13.05 9.37435 13.3333 9.65768 13.3333 9.99935C13.3333 10.341 13.05 10.6243 12.7083 10.6243H7.5V13.9993C7.5 16.666 9.16667 18.3327 11.8333 18.3327H13.9917C16.6583 18.3327 18.325 16.666 18.325 13.9993V5.99935C18.3333 3.33268 16.6667 1.66602 14 1.66602Z"
        fill={color ? color : GlobalConsts.Colors.primaryGreen}
      />
      <Path
        d="M3.79995 9.37552L5.52495 7.65052C5.64995 7.52552 5.70828 7.36719 5.70828 7.20885C5.70828 7.05052 5.64995 6.88385 5.52495 6.76719C5.28328 6.52552 4.88328 6.52552 4.64162 6.76719L1.84995 9.55885C1.60828 9.80052 1.60828 10.2005 1.84995 10.4422L4.64162 13.2339C4.88328 13.4755 5.28328 13.4755 5.52495 13.2339C5.76662 12.9922 5.76662 12.5922 5.52495 12.3505L3.79995 10.6255H7.49995V9.37552H3.79995V9.37552Z"
        fill={color ? color : GlobalConsts.Colors.primaryGreen}
      />
    </Svg>
  );
}
