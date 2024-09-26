import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function CalendarSvg(props) {
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.4}
        d="M15.739 3.345V1.879a.705.705 0 10-1.41 0v1.41H8.222v-1.41a.705.705 0 10-1.41 0v1.466a3.991 3.991 0 00-3.957 3.993.47.47 0 00.47.498h15.899a.47.47 0 00.47-.498 3.991 3.991 0 00-3.955-3.993z"
        fill="url(#paint0_linear_180_186)"
      />
      <Path
        d="M18.792 9.246H3.758a.94.94 0 00-.94.94v5.787c0 2.82 1.41 4.698 4.699 4.698h7.517c3.289 0 4.698-1.879 4.698-4.698v-5.788a.94.94 0 00-.94-.94zM8.654 17.11c-.092.083-.196.15-.31.198a.885.885 0 01-.714 0 1.086 1.086 0 01-.31-.198.953.953 0 010-1.334c.091-.083.196-.15.31-.197a.94.94 0 01.714 0c.114.047.218.114.31.197a.953.953 0 010 1.334zm.197-3.598a1.084 1.084 0 01-.197.31c-.092.083-.196.15-.31.197a.887.887 0 01-.714 0 1.084 1.084 0 01-.31-.197 1.084 1.084 0 01-.198-.31.886.886 0 010-.715c.048-.113.115-.218.198-.31.091-.082.196-.15.31-.197a.94.94 0 01.714 0c.114.048.218.115.31.197.083.092.15.197.197.31a.886.886 0 010 .715zm3.091.31c-.09.083-.196.15-.31.197a.887.887 0 01-.714 0 1.085 1.085 0 01-.31-.197.953.953 0 010-1.335c.092-.082.197-.15.31-.197a.861.861 0 01.714 0c.114.048.22.115.31.197a.953.953 0 010 1.335z"
        fill="url(#paint1_linear_180_186)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_180_186"
          x1={11.2744}
          y1={9.50183}
          x2={11.2744}
          y2={0.237676}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_180_186"
          x1={11.2754}
          y1={23.5279}
          x2={11.2754}
          y2={7.63899}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00F0C5" />
          <Stop offset={1} stopColor="#F58AC9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default CalendarSvg;
