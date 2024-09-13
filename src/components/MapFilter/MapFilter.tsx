import { useStore } from '@/store';
import { TrigCountry, TrigCondition, NationalPark, AreaOfNaturalBeauty } from '@/postgres-schema';

import styles from './MapFilter.module.css';

function MapFilter() {
  const { trigSettings, setTrigCountrySetting, setTrigConditionSetting, setNationalParkSetting, setAONBSetting } =
    useStore();

  const settingsConfig = [
    {
      title: 'Trig Country',
      settings: trigSettings.countries,
      setSetting: setTrigCountrySetting,
      type: TrigCountry as unknown as keyof typeof trigSettings.countries,
    },
    {
      title: 'Trig Condition',
      settings: trigSettings.conditions,
      setSetting: setTrigConditionSetting,
      type: TrigCondition as unknown as keyof typeof trigSettings.conditions,
    },
    {
      title: 'National Parks',
      settings: trigSettings.nationalParks,
      setSetting: setNationalParkSetting,
      type: NationalPark as unknown as keyof typeof trigSettings.nationalParks,
    },
    {
      title: 'Areas Of Natural Beauty',
      settings: trigSettings.aonbs,
      setSetting: setAONBSetting,
      type: AreaOfNaturalBeauty as unknown as keyof typeof trigSettings.aonbs,
    },
  ];

  return (
    <div className={styles.container}>
      {settingsConfig.map(({ title, settings, setSetting, type }) => (
        <div key={title}>
          <h3>{title}</h3>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={Object.values(settings).every((value) => value)}
              onChange={({ target: { checked } }) => {
                Object.keys(settings).forEach((setting) => setSetting(setting as keyof typeof settings, checked));
              }}
            />
            <b>All</b>
          </label>
          {Object.entries(settings).map(([setting, value]) => (
            <label key={setting} className={styles.label}>
              <input
                type="checkbox"
                checked={value}
                onChange={({ target: { checked } }) => setSetting(setting as keyof typeof settings, checked)}
              />
              {setting}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MapFilter;
