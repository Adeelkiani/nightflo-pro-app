import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function SettingAboutSvg(props) {
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.76 13.92L14.36 2.4A3.987 3.987 0 0011 0a3.987 3.987 0 00-3.36 2.4l-6.4 11.52a3.96 3.96 0 00-.25 3.99 3.936 3.936 0 003.61 1.72h12.8a3.936 3.936 0 003.61-1.72 3.96 3.96 0 00-.25-3.99zM10.25 7a.75.75 0 111.5 0v5a.75.75 0 11-1.5 0V7zm1.46 8.71l-.15.12a.756.756 0 01-.18.09.601.601 0 01-.19.06A1.223 1.223 0 0111 16a1.509 1.509 0 01-.2-.02.637.637 0 01-.18-.06.76.76 0 01-.18-.09l-.15-.12a1.014 1.014 0 010-1.42l.15-.12a.76.76 0 01.18-.09.637.637 0 01.18-.06.856.856 0 01.39 0c.066.01.13.03.19.06a.756.756 0 01.18.09l.15.12a1.014 1.014 0 010 1.42z"
        fill="url(#paint0_linear_82_1455)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_82_1455"
          x1={10.9997}
          y1={24.5566}
          x2={10.9997}
          y2={-2.76262}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F58AC9" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SettingAboutSvg;
