const greetings: { greeting: `Good${string}`; startHour: number }[] = [
  { greeting: 'Goodnight', startHour: 0 },
  { greeting: 'Good morning', startHour: 6 },
  { greeting: 'Good afternoon', startHour: 12 },
  { greeting: 'Good evening', startHour: 18 },
];

export function useGreetings() {
  const currentHour = +new Date().toLocaleTimeString('en-GB', { hour: '2-digit', hour12: false });

  return greetings.find(({ startHour }, index) => {
    const conditionA = currentHour >= startHour;
    const nextStartHour = greetings[index + 1]?.startHour;
    const conditionB = nextStartHour ? currentHour < nextStartHour : true;
    return conditionA && conditionB;
  })?.greeting;
}
