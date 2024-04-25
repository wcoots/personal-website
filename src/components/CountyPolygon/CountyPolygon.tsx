import React, { useRef } from 'react';
import { County } from '@/data/counties';
import styles from './CountyPolygon.module.css';
import { transformPosition } from '@/utils';

interface Props {
  county: County;
  colour: string;
}

const CountyPolygon = React.memo(function ({ county, colour }: Props) {
  const windowWidth = useRef(window.outerWidth);

  const paths = county.coordinates.map((polygon) => `M ${polygon.map(([x, y]) => `${x} ${y}`).join(' L ')} Z`);

  const { x: width, y: height } = transformPosition(
    county.dimensions.width,
    county.dimensions.height,
    windowWidth.current,
  );

  const { x: positionX, y: positionY } = transformPosition(county.position.x, county.position.y, windowWidth.current);

  return (
    <svg
      className={styles['county-svg']}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${county.viewbox.x} ${county.viewbox.y}`}
      width={`${width}px`}
      height={`${height}px`}
      key={county.name}
      style={{ left: `${positionX}px`, top: `${positionY}px` }}
    >
      {paths.map((path, index) => (
        <path
          className={styles['county-path']}
          key={index}
          data-county-name={county.name}
          d={path}
          fill={colour}
          stroke="black"
          strokeWidth="2"
          pointerEvents="visiblePainted"
        />
      ))}
    </svg>
  );
});

CountyPolygon.displayName = 'CountyPolygon';

export default CountyPolygon;
