import React, { useRef } from 'react';
import { County } from '@/data/counties';
import styles from './CountyPolygon.module.css';

interface Props {
  county: County;
  colour: string;
}

const CountyPolygon = React.memo(function ({ county, colour }: Props) {
  const windowWidth = useRef(window.outerWidth);

  const paths = county.coordinates.map((polygon) => `M ${polygon.map(([x, y]) => `${x} ${y}`).join(' L ')} Z`);

  function transformValue(value: number) {
    if (windowWidth.current > 750) return value;
    const shrinkFactor = windowWidth.current / 790;
    return value * shrinkFactor;
  }

  const width = transformValue(county.dimensions.width);
  const height = transformValue(county.dimensions.height);
  const positionX = transformValue(county.position.x);
  const positionY = transformValue(county.position.y);

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
