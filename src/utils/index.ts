export function isMobile(windowWidth?: number) {
  return (windowWidth ?? window.innerWidth) <= 750;
}
