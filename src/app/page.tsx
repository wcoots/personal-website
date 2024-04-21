'use client';
import { useRef } from 'react';
import { useGreetings, useScrollLogic } from '../hooks';
import { IconButton } from '../components';
import styles from './page.module.css';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const greeting = useGreetings();
  useScrollLogic({ containerRef });

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.viewport}>
        <div className={styles.section}>{greeting}</div>
        <div className={styles.section}>
          {' '}
          I am <br /> William Cooter
        </div>
        <div className={styles.section}>
          I am a software engineer <br /> at Living Map
        </div>
        <div className={styles.section}>
          <IconButton identifier="github" />
          <IconButton identifier="linkedin" />
        </div>
        <div className={styles.section}>{greeting}</div>
      </div>
    </div>
  );
}
