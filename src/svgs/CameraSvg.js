import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function CameraSvg(props) {
  return (
    <Svg
      width={"50%"}
      height={"50%"}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_47_112)">
        <Path
          d="M22.68 19.363a5.502 5.502 0 01-5.495 5.496 5.5 5.5 0 01-5.495-5.496 5.5 5.5 0 015.495-5.495 5.502 5.502 0 015.495 5.495zm11.542-7.803V27.17a3.768 3.768 0 01-3.768 3.767H3.915A3.768 3.768 0 01.147 27.17V11.56a3.768 3.768 0 013.768-3.768H8.55V6.49a3.296 3.296 0 013.296-3.297h10.677a3.296 3.296 0 013.297 3.297V7.79h4.634a3.77 3.77 0 013.768 3.77zm-8.716 7.803c0-4.588-3.733-8.32-8.321-8.32-4.588 0-8.32 3.732-8.32 8.32 0 4.589 3.732 8.322 8.32 8.322s8.321-3.733 8.321-8.322z"
          fill="#EF7FD5"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_47_112">
          <Path
            fill="#fff"
            transform="translate(.147 .027)"
            d="M0 0H34.0746V34.0746H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CameraSvg;
