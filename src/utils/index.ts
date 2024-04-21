export function toTitleCase(input: string) {
  return input
    .split('-')
    .map((word) => (['and', 'of'].includes(word) ? word : word[0].toUpperCase() + word.slice(1)))
    .join(' ');
}
