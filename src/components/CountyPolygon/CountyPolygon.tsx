import React from 'react';
import { County } from '@/data/counties';
import styles from './CountyPolygon.module.css';

interface Props {
  county: County;
  colour: string;
}

const CountyPolygon = React.memo(function ({ county, colour }: Props) {
  const paths = county.coordinates.map((polygon) => `M ${polygon.map(([x, y]) => `${x} ${y}`).join(' L ')} Z`);

  return (
    <svg
      className={styles['county-svg']}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${county.viewbox?.x} ${county.viewbox?.y}`}
      width={`${county.dimensions?.width}px`}
      height={`${county.dimensions?.height}px`}
      key={county.name}
      style={{ left: `${county.position.x}px`, top: `${county.position.y}px` }}
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
