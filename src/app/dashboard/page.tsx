'use client';
import { FootballWidget, WeatherWidget, ApodWidget, MoonPhaseWidget } from '@/components';
import styles from './dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <FootballWidget />
      <WeatherWidget />
      <MoonPhaseWidget />
      <ApodWidget />
    </div>
  );
}
