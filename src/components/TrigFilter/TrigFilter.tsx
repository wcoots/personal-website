import { useStore } from '@/store';
import styles from './TrigFilter.module.css';

function TrigFilter() {
  const {
    trigCountrySettings,
    trigConditionSettings,
    nationalParkSettings,
    aonbSettings,
    setTrigCountrySettings,
    setTrigConditionSettings,
    setNationalParkSettings,
    setAONBSettings,
  } = useStore();

  return (
    <div className={styles.container}>
      <h3>Trig Country</h3>
      {Object.entries(trigCountrySettings).map(([country, value]) => (
        <label key={country} className={styles.label}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setTrigCountrySettings({ ...trigCountrySettings, [country]: e.target.checked })}
          />
          {country}
        </label>
      ))}
      <h3>Trig Condition</h3>
      {Object.entries(trigConditionSettings).map(([condition, value]) => (
        <label key={condition} className={styles.label}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setTrigConditionSettings({ ...trigConditionSettings, [condition]: e.target.checked })}
          />
          {condition}
        </label>
      ))}
      <h3>National Park</h3>
      {Object.entries(nationalParkSettings).map(([nationalPark, value]) => (
        <label key={nationalPark} className={styles.label}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setNationalParkSettings({ ...nationalParkSettings, [nationalPark]: e.target.checked })}
          />
          {nationalPark}
        </label>
      ))}
      <h3>AONB</h3>
      {Object.entries(aonbSettings).map(([aonb, value]) => (
        <label key={aonb} className={styles.label}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setAONBSettings({ ...aonbSettings, [aonb]: e.target.checked })}
          />
          {aonb}
        </label>
      ))}
    </div>
  );
}

export default TrigFilter;
