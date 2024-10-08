import * as React from 'react';

import Svg, {Path, SvgProps} from 'react-native-svg';
export const ContractIcon = (props: SvgProps) => (
  <Svg
    width={props.width ?? 24}
    height={props.height ?? 24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <Path
      d="M6 22C5.16667 22 4.45833 21.7083 3.875 21.125C3.29167 20.5417 3 19.8333 3 19V16H6V2H21V19C21 19.8333 20.7083 20.5417 20.125 21.125C19.5417 21.7083 18.8333 22 18 22H6ZM18 20C18.2833 20 18.521 19.904 18.713 19.712C18.905 19.52 19.0007 19.2827 19 19V4H8V16H17V19C17 19.2833 17.096 19.521 17.288 19.713C17.48 19.905 17.7173 20.0007 18 20ZM9 9V7H18V9H9ZM9 12V10H18V12H9ZM6 20H15V18H5V19C5 19.2833 5.096 19.521 5.288 19.713C5.48 19.905 5.71733 20.0007 6 20ZM6 20H5H15H6Z"
      fill="#757575"
    />
  </Svg>
);
