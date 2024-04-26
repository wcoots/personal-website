import React, { ReactNode, useRef, useEffect } from 'react';
import styles from './InformationPanel.module.css';
import { informationPanelStore } from '@/store';
import { isMobile } from '@/utils';

export interface Props {
  children: ReactNode;
}

function InformationPanel({ children }: Props) {
  const { height, setHeight, mostRecentState, setMostRecentState } = informationPanelStore();
  const minHeight = 100;
  const maxHeight = window.outerHeight - 100;
  const mobile = isMobile();
  const heightRef = useRef(height);
  const mostRecentStateRef = useRef(mostRecentState);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!height) setHeight(mobile ? minHeight : maxHeight - 100);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [setHeight, setMostRecentState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles['information-panel']} style={mobile ? { height: `${height}px` } : {}}>
      <div ref={headerRef} className={styles['information-panel-header']}>
        <div className={styles['information-panel-header-tab']} />
      </div>
      <div className={styles['information-panel-content']}>{children}</div>
    </div>
  );
}

export default InformationPanel;
