import React, { ReactNode, useRef, useEffect } from 'react';
import styles from './InformationPanel.module.css';
import { informationPanelStore } from '@/store';

export interface Props {
  children: ReactNode;
}

function InformationPanel({ children }: Props) {
  const { height, setHeight, mostRecentState, setMostRecentState } = informationPanelStore();
  const minHeight = 100;
  const maxHeight = window.innerHeight - 100;
  const isMobile = window.outerWidth < 750;
  const heightRef = useRef(height);
  const mostRecentStateRef = useRef(mostRecentState);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!height) setHeight(isMobile ? minHeight : maxHeight - 100);
  }, []);

  useEffect(() => {
    heightRef.current = height;
  }, [height]);

  useEffect(() => {
    mostRecentStateRef.current = mostRecentState;
  }, [mostRecentState]);

  useEffect(() => {
    function handleTouchMove(event: TouchEvent) {
      if (event.target !== headerRef.current) return;

      const newHeight = Math.max(minHeight, Math.min(window.outerHeight - event.touches[0].clientY, maxHeight));
      setHeight(newHeight);
    }

    function handleTouchEnd(event: TouchEvent) {
      if (event.target !== headerRef.current) return;

      const openFactor = mostRecentStateRef.current === 'open' ? 0.9 : 0.35;
      const isOpen = heightRef.current > maxHeight * openFactor;
      setMostRecentState(isOpen ? 'open' : 'closed');
      setHeight(isOpen ? maxHeight : minHeight);
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [setHeight, setMostRecentState]);

  return (
    <div className={styles['information-panel']} style={{ height: `${height}px` }}>
      <div
        ref={headerRef}
        className={styles['information-panel-header']}
        style={isMobile ? { height: minHeight, width: window.outerWidth } : { display: 'none' }}
      >
        <div className={styles['information-panel-header-tab']} />
      </div>
      <div className={styles['information-panel-content']}>{children}</div>
    </div>
  );
}

export default InformationPanel;
