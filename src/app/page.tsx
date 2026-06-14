'use client';
import { useRef } from 'react';
import { useGreetings, useScrollLogic } from '@/hooks';
import { IconButton } from '@/components';
import styles from './homepage.module.css';

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
          <span>
            I am a software engineer <br /> at{' '}
            <a href="https://epoch.blue/" target="_blank" rel="noopener noreferrer" className={styles.href}>
              Epoch
            </a>
          </span>
        </div>
        <div className={styles.section}>
          <IconButton identifier="github" />
          <IconButton identifier="linkedin" />
          <IconButton identifier="activitymap" />
        </div>
        <div className={styles.section}>{greeting}</div>
      </div>
    </div>
  );
}
