'use client';
import { useRef } from 'react';
import { useGreetings } from '../hooks';
import { isMobileDevice } from '../utils';
import styles from './page.module.css';
import { IconButton } from '../components';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = isMobileDevice();
  const containerClass = isMobile ? styles['container-mobile'] : styles.container;
  const sectionClass = isMobile ? styles['section-mobile'] : styles.section;

  const greeting = useGreetings();

  return (
    <div ref={containerRef} className={containerClass}>
      <div className={sectionClass}>{greeting}</div>
      <div className={sectionClass}>
        I am <br /> William Cooter
      </div>
      <div className={sectionClass}>
        I am a software engineer <br /> at Living Map
      </div>
      <div className={sectionClass}>
        <IconButton identifier="github" />
        <IconButton identifier="linkedin" />
      </div>
      {isMobile && <div className={sectionClass}>{greeting}</div>}
    </div>
  );
}
