import { useState } from 'react';
import { MoonPhase } from '@/types';

interface Response {
  moon: { phase_name: string; emoji: string };
}

export function useMoonPhase() {
  const [moonPhase, setMoonPhase] = useState<MoonPhase | null>(null);

  async function getMoonPhase() {
    const response = await fetch('/api/moon-phase', { next: { revalidate: 3600 } });
    const { moon }: Response = await response.json();

    setMoonPhase({ phase: moon.phase_name, emoji: moon.emoji });
  }

  return { moonPhase, getMoonPhase };
}
