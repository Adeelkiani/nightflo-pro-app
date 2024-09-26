import * as React from "react";
import Svg, { Path } from "react-native-svg";

function InviteIconSvg(props) {
  const { color } = props;
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19.981 1.397c-.098-.41-.547-.687-.954-.543L1.374 7.086c-.271.1-.47.359-.485.655a.76.76 0 00.421.7l6.837 3.191 3.337-3.336c.66-.661 1.716.36 1.038 1.038L9.185 12.67l3.193 6.84c.13.25.384.408.663.42.303.014.584-.218.692-.49l6.23-17.65a.687.687 0 00.018-.394z"
        fill={color ? color : "#00F0C5"}
      />
    </Svg>
  );
}

export default InviteIconSvg;
