import { TrigTable as TrigPoint } from '@/postgres-schema';
import styles from './TrigDetails.module.css';

interface Props {
  trigPoint: TrigPoint;
}

const trigDetails: {
  label: string;
  value(trigPoint: TrigPoint): string | null;
  display?(trigPoint: TrigPoint): boolean;
}[] = [
  { label: 'Condition', value: (trigPoint) => trigPoint.condition },
  { label: 'Position', value: (trigPoint) => `[${trigPoint.latitude}, ${trigPoint.longitude}]` },
  { label: 'Country', value: (trigPoint) => trigPoint.country },
  {
    label: 'Historic use',
    value: (trigPoint) => trigPoint.historic_use,
    display: (trigPoint) => !!trigPoint.historic_use,
  },
  {
    label: 'Current use',
    value: (trigPoint) => trigPoint.current_use,
    display: (trigPoint) => !!trigPoint.current_use,
  },
  {
    label: 'Height',
    value: (trigPoint) => `${trigPoint.height_feet}ft`,
    display: (trigPoint) => !!trigPoint.height_feet,
  },
  {
    label: 'National Park',
    value: (trigPoint) => trigPoint.national_park,
    display: (trigPoint) => !!trigPoint.national_park,
  },
  { label: 'AONB', value: (trigPoint) => trigPoint.aonb, display: (trigPoint) => !!trigPoint.aonb },
];

function TrigDetails({ trigPoint }: Props) {
  return (
    <div className={styles.container}>
      <h1>{trigPoint.name}</h1>
      {trigDetails.map(({ label, value, display }) => {
        if (display && !display(trigPoint)) return null;
        return (
          <p key={label}>
            <b>{label}:</b> {value(trigPoint)}
          </p>
        );
      })}
    </div>
  );
}

export default TrigDetails;
