import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { GlobalConsts } from "../consts/GlobalConsts";

function DeleteSvg(props) {
  const { color } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M4.99996 15.8333C4.99996 16.75 5.74996 17.5 6.66663 17.5H13.3333C14.25 17.5 15 16.75 15 15.8333V7.5C15 6.58333 14.25 5.83333 13.3333 5.83333H6.66663C5.74996 5.83333 4.99996 6.58333 4.99996 7.5V15.8333ZM15 3.33333H12.9166L12.325 2.74167C12.175 2.59167 11.9583 2.5 11.7416 2.5H8.25829C8.04163 2.5 7.82496 2.59167 7.67496 2.74167L7.08329 3.33333H4.99996C4.54163 3.33333 4.16663 3.70833 4.16663 4.16667C4.16663 4.625 4.54163 5 4.99996 5H15C15.4583 5 15.8333 4.625 15.8333 4.16667C15.8333 3.70833 15.4583 3.33333 15 3.33333Z"
        fill={color ? color : GlobalConsts.Colors.primaryGreen}
      />
    </Svg>
  );
}

export default DeleteSvg;
