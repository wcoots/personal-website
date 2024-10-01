export function isMobile(windowWidth?: number) {
  return (windowWidth ?? window.outerWidth) <= 750;
}
