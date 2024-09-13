import { useStore } from '@/store';
import styles from './MapFilter.module.css';
import { AONB, NationalPark, TrigCondition, TrigCountry } from '@/postgres-schema';

function MapFilter() {
  const { trigSettings, setTrigCountrySetting, setTrigConditionSetting, setNationalParkSetting, setAONBSetting } =
    useStore();

  return (
    <div className={styles.container}>
      <h3>Trig Country</h3>
      {Object.entries(trigSettings.countries).map(([country, value]) => (
        <label key={country} className={styles.label}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setTrigCountrySetting(country as TrigCountry, e.target.checked)}
          />
          {country}
        </label>
      ))}
      <h3>Trig Condition</h3>
      {Object.entries(trigSettings.conditions).map(([condition, value]) => (
        <label key={condition} className={styles.label}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setTrigConditionSetting(condition as TrigCondition, e.target.checked)}
          />
          {condition}
        </label>
      ))}
      <h3>National Parks</h3>
      {Object.entries(trigSettings.nationalParks).map(([park, value]) => (
        <label key={park} className={styles.label}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setNationalParkSetting(park as NationalPark, e.target.checked)}
          />
          {park}
        </label>
      ))}
      <h3>AONBs</h3>
      {Object.entries(trigSettings.aonbs).map(([aonb, value]) => (
        <label key={aonb} className={styles.label}>
          <input type="checkbox" checked={value} onChange={(e) => setAONBSetting(aonb as AONB, e.target.checked)} />
          {aonb}
        </label>
      ))}
    </div>
  );
}

export default MapFilter;
