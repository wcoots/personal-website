export function toTitleCase(input: string) {
  return input
    .split('-')
    .map((word) => (['and', 'of'].includes(word) ? word : word[0].toUpperCase() + word.slice(1)))
    .join(' ');
}

export function transformPosition(x: number, y: number, windowWidth: number) {
  if (!isMobile(windowWidth)) return { x, y };
  const shrinkFactor = windowWidth / 790;
  return { x: x * shrinkFactor, y: y * shrinkFactor };
}

export function isMobile(windowWidth?: number) {
  return (windowWidth ?? window.outerWidth) <= 750;
}

export function formatDate(date: Date | string) {
  if (typeof date === 'string') date = new Date(date);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}

export function formatTime(date: Date | number) {
  if (typeof date === 'number') date = new Date(date * 1000);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
