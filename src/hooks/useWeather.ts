import { useState } from 'react';
import { Weather } from '@/types';

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);

  async function getWeather() {
    const response = await fetch('/api/weather', { next: { revalidate: 3600 } });
    const forecast: Weather = await response.json();

    setWeather(forecast);
  }

  return { weather, getWeather };
}
