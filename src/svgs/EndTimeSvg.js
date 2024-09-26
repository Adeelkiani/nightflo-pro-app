import * as React from "react";
import Svg, { Path } from "react-native-svg";

function EndTimeSvg(props) {
  const { color } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M10 6.6665V10.8332"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10 18.3333C5.97504 18.3333 2.70837 15.0667 2.70837 11.0417C2.70837 7.01667 5.97504 3.75 10 3.75C14.025 3.75 17.2917 7.01667 17.2917 11.0417"
        stroke={color ? color : "#00F0C5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.5 1.6665H12.5"
        stroke={color ? color : "#00F0C5"}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.4166 15.4165V14.4498C12.4166 13.2581 13.2666 12.7665 14.3 13.3665L15.1333 13.8498L15.9666 14.3331C17 14.9331 17 15.9081 15.9666 16.5081L15.1333 16.9915L14.3 17.4748C13.2666 18.0748 12.4166 17.5831 12.4166 16.3915V15.4165Z"
        stroke={color ? color : "#00F0C5"}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default EndTimeSvg;
