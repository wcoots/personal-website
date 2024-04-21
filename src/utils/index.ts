export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
}

export function toTitleCase(input: string) {
  return input
    .split('-')
    .map((word) => (['and', 'of'].includes(word) ? word : word[0].toUpperCase() + word.slice(1)))
    .join(' ');
}
