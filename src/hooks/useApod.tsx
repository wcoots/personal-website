import { useState } from 'react';

export function useApod() {
  const [apod, setApod] = useState<string | null>(null);

  async function getApod() {
    const response = await fetch('/api/apod', { next: { revalidate: 3600 } });
    const { url }: { url: string } = await response.json();

    setApod(url);
  }

  return { apod, getApod };
}
