import { RefObject, useRef, useEffect } from 'react';
import chroma from 'chroma-js';

interface ScrollLogicParams {
  containerRef: RefObject<HTMLDivElement>;
}

const trackpadScrollSensitivity = 0.1;
const mouseWheelScrollSensitivity = 0.2;
const touchSensitivity = 0.15;
const inertiaDecayRate = 0.95;
const minimumInertiaVelocity = 0.3;
const smoothingFactor = 0.1;
const backgroundColours = { blue: '#2c5b6b', red: '#8f4731', grey: '#53494c', green: '#7b7d2a' };
const colourScales = {
  'blue-red': chroma.scale([backgroundColours.blue, backgroundColours.red]),
  'red-grey': chroma.scale([backgroundColours.red, backgroundColours.grey]),
  'grey-green': chroma.scale([backgroundColours.grey, backgroundColours.green]),
  'green-blue': chroma.scale([backgroundColours.green, backgroundColours.blue]),
};

export function useScrollLogic({ containerRef }: ScrollLogicParams) {
  const isMobile = useRef(false);
  const x = useRef(0);
  const y = useRef(0);
  const touchStartY = useRef(0);
  const lastVelocity = useRef(0);
  const wheelDeltaAccumulator = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    if (window.innerWidth < 600) isMobile.current = true;

    function setBackgroundColour(side: keyof typeof colourScales, percentage: number) {
      // Sets the background colour based on the scroll position.
      // Colours change between 25% and 75% of the scroll area.
      if (!containerRef.current) return;

      if (percentage < 25) percentage = 0;
      else if (percentage > 75) percentage = 100;
      else if (percentage < 50) percentage = (percentage - 25) * 2;
      else percentage = percentage - (50 - percentage);

      const colour = colourScales[side](percentage / 100).hex();
      containerRef.current.style.backgroundColor = colour;
    }

    function circularScroll({ direction, delta }: { direction: 'clockwise' | 'anti-clockwise'; delta: number }) {
      if (!containerRef.current) return;

      delta = Math.max(Math.min(delta, 10), -10);

      if (direction === 'clockwise') {
        if (y.current === 0 && x.current < 100) {
          x.current = Math.min(x.current + delta, 100); // ➡️
          setBackgroundColour('blue-red', x.current);
        } else if (x.current === 100 && y.current < 100) {
          y.current = Math.min(y.current + delta, 100); // ⬇️
          setBackgroundColour('red-grey', y.current);
        } else if (y.current === 100 && x.current > 0) {
          x.current = Math.max(x.current - delta, 0); // ⬅️
          setBackgroundColour('grey-green', 100 - x.current);
        } else if (x.current === 0 && y.current > 0) {
          y.current = Math.max(y.current - delta, 0); // ⬆️
          setBackgroundColour('green-blue', 100 - y.current);
        }
      } else if (direction === 'anti-clockwise') {
        if (x.current === 0 && y.current < 100) {
          y.current = Math.min(y.current - delta, 100); // ⬇️
          setBackgroundColour('green-blue', 100 - y.current);
        } else if (y.current === 100 && x.current < 100) {
          x.current = Math.min(x.current - delta, 100); // ➡️
          setBackgroundColour('grey-green', 100 - x.current);
        } else if (x.current === 100 && y.current > 0) {
          y.current = Math.max(y.current + delta, 0); // ⬆️
          setBackgroundColour('red-grey', y.current);
        } else if (y.current === 0 && x.current > 0) {
          x.current = Math.max(x.current + delta, 0); // ⬅️
          setBackgroundColour('blue-red', x.current);
        }
      }

      containerRef.current.style.transform = `translate(-${x.current}svw, -${y.current}svh)`;
    }

    function verticalScroll({ delta }: { delta: number }) {
      if (!containerRef.current) return;

      delta = Math.max(Math.min(delta, 10), -10);
      y.current = (y.current + delta + 400) % 400;

      if (y.current < 100) {
        setBackgroundColour('blue-red', y.current);
      } else if (y.current >= 100 && y.current < 200) {
        setBackgroundColour('red-grey', y.current - 100);
      } else if (y.current >= 200 && y.current < 300) {
        setBackgroundColour('grey-green', y.current - 200);
      } else if (y.current >= 300) {
        setBackgroundColour('green-blue', y.current - 300);
      }

      containerRef.current.style.transform = `translateY(-${y.current}svh)`;
    }

    function handleScroll(event: WheelEvent) {
      if (!containerRef.current) return;
      event.preventDefault();

      const isTrackpad = Math.abs(event.deltaY) < 50;
      const sensitivity = isTrackpad ? trackpadScrollSensitivity : mouseWheelScrollSensitivity;
      const delta = event.deltaY * sensitivity;
      wheelDeltaAccumulator.current += delta;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(applyWheelInertia);
      }
    }

    function applyWheelInertia() {
      if (Math.abs(wheelDeltaAccumulator.current) < 1) {
        wheelDeltaAccumulator.current = 0;
        if (rafId.current !== null) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
        return;
      }

      const delta = wheelDeltaAccumulator.current * smoothingFactor;
      const direction = delta > 0 ? 'clockwise' : 'anti-clockwise';
      isMobile.current ? verticalScroll({ delta }) : circularScroll({ direction, delta });

      wheelDeltaAccumulator.current -= delta;
      rafId.current = requestAnimationFrame(applyWheelInertia);
    }

    function handleTouchStart(event: TouchEvent) {
      touchStartY.current = event.touches[0].clientY;
    }

    function handleTouchMove(event: TouchEvent) {
      const currentY = event.touches[0].clientY;
      const movement = currentY - touchStartY.current;
      const delta = -movement * touchSensitivity;
      touchStartY.current = currentY;
      lastVelocity.current = delta;

      verticalScroll({ delta });
    }

    function handleTouchEnd() {
      lastVelocity.current = Math.max(Math.min(lastVelocity.current, 10), -10);

      const applyInertia = () => {
        if (Math.abs(lastVelocity.current) < minimumInertiaVelocity) {
          lastVelocity.current = 0;
          return;
        }

        verticalScroll({ delta: lastVelocity.current });
        lastVelocity.current *= inertiaDecayRate;
        requestAnimationFrame(applyInertia);
      };

      requestAnimationFrame(applyInertia);
    }

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, x, y, isMobile]);
}
