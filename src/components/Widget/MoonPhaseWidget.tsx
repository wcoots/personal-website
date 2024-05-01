import { useEffect } from 'react';
import { useMoonPhase } from '@/hooks';
import styles from './Widget.module.css';

function MoonPhaseWidget() {
  const { moonPhase, getMoonPhase } = useMoonPhase();

  useEffect(() => {
    getMoonPhase();
  }, []);

  return (
    <div className={styles['widget-moon-phase']}>
      {moonPhase && (
        <>
          <p className={styles['moon-emoji']}>{moonPhase.emoji}</p>
          <p>{moonPhase.phase}</p>
        </>
      )}
    </div>
  );
}

export default MoonPhaseWidget;
