import { useEffect } from 'react';
import { useApod } from '@/hooks';
import styles from './Widget.module.css';

function ApodWidget() {
  const { apod, getApod } = useApod();

  useEffect(() => {
    getApod();
  }, []);

  return (
    <div className={styles['widget-apod']}>
      {apod && <img className={styles['apod-image']} src={apod} alt="Astronomy Picture of the Day" />}
    </div>
  );
}

export default ApodWidget;
