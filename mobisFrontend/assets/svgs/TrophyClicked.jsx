import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function trophyClicked(props) {
  return (
    <Svg
      width={44}
      height={46}
      viewBox="0 0 44 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_115_480)"
        stroke="#FF5745"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M22 30.357V42.93M14 43.5h16M11 2.5H2v9a9 9 0 009 9v-18zM33 2.5h9v9a9 9 0 01-9 9v-18z" />
        <Path
          d="M11 2.071v17.286c0 6.075 4.925 11 11 11s11-4.925 11-11V2.071H11z"
          fill="#FF5745"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_115_480">
          <Path fill="#fff" transform="translate(0 .5)" d="M0 0H44V45H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default trophyClicked
