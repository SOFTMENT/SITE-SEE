import * as React from "react"
import Svg, { Path } from "react-native-svg"

const HomeSvg = (props) => {
  const {size,color} = props
  return <Svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8.657 22.236v-3.568c0-.91.744-1.649 1.661-1.649h3.354c.44 0 .862.174 1.174.483.311.31.486.729.486 1.166v3.568c-.002.378.147.742.416 1.01.269.27.634.42 1.016.42h2.287a4.037 4.037 0 0 0 2.85-1.165 3.978 3.978 0 0 0 1.182-2.827V9.511c0-.856-.382-1.67-1.044-2.219l-7.783-6.17a3.614 3.614 0 0 0-4.606.083L2.045 7.292a2.886 2.886 0 0 0-1.128 2.22v10.152c0 2.21 1.805 4.003 4.032 4.003h2.235c.793 0 1.436-.635 1.442-1.421l.031-.01Z"
      fill={color}
    />
  </Svg>
}

export default HomeSvg
