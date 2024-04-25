import { colourPallets, ColourPalletName } from '@/data/colours';
import { isMobile } from '@/utils';

interface Props {
  xPosition: number;
  yPosition: number;
  colourPallet: ColourPalletName;
}

function LocationPin({ xPosition, yPosition, colourPallet }: Props) {
  const backgroundColour = colourPallets[colourPallet].range[0];
  const size = isMobile() ? 20 : 40;

  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="-3.36 -3.36 30.72 30.72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="matrix(1, 0, 0, 1, 0, 0)"
      style={{ left: `${xPosition - 10}px`, top: `${yPosition - 10}px`, position: 'absolute', zIndex: 1 }}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(1.2,1.2), scale(0.9)">
        <rect
          x="-3.36"
          y="-3.36"
          width="30.72"
          height="30.72"
          rx="15.36"
          fill={backgroundColour}
          stroke="white"
          strokeWidth="1"
        />
      </g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.25003 10C7.25003 7.37665 9.37667 5.25 12 5.25C14.6234 5.25 16.75 7.37665 16.75 10C16.75 12.6234 14.6234 14.75 12 14.75C9.37667 14.75 7.25003 12.6234 7.25003 10ZM12 6.75C10.2051 6.75 8.75003 8.20507 8.75003 10C8.75003 11.7949 10.2051 13.25 12 13.25C13.795 13.25 15.25 11.7949 15.25 10C15.25 8.20507 13.795 6.75 12 6.75Z"
          fill="#ffffff"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.52439 8.85685C3.87872 4.55824 7.47087 1.25 11.7841 1.25H12.216C16.5292 1.25 20.1213 4.55824 20.4757 8.85685C20.666 11.166 19.9527 13.4589 18.4861 15.2526L13.693 21.1144C12.818 22.1845 11.1821 22.1845 10.307 21.1144L5.51399 15.2526C4.04733 13.4589 3.33405 11.166 3.52439 8.85685ZM11.7841 2.75C8.25152 2.75 5.30952 5.45948 5.01932 8.98008C4.8609 10.9019 5.45455 12.8102 6.67521 14.3031L11.4683 20.1649C11.7431 20.501 12.2569 20.501 12.5318 20.1649L17.3248 14.3031C18.5455 12.8102 19.1391 10.9019 18.9807 8.98008C18.6905 5.45948 15.7485 2.75 12.216 2.75H11.7841Z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}

export default LocationPin;
