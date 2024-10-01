import { useStore, Settings } from '@/store';
import { TrigCountry, TrigCondition, NationalPark, AreaOfNaturalBeauty } from '@/postgres-schema';

import styles from './MapFilter.module.css';

interface ChildSetting {
  title: string;
  settings: Settings;
  toggleAll(checked: boolean): void;
  toggle(setting: string, checked: boolean): void;
}

interface SettingsConfig {
  title: string;
  value(): boolean;
  toggle(checked: boolean): void;
  children?: ChildSetting[];
}

function MapFilter() {
  const {
    trigSettings,
    setTrigSetting,
    setTrigCountrySetting,
    setTrigConditionSetting,
    setNationalParkAndAreaOfNaturalBeautySetting,
  } = useStore();

  const settingsConfig: SettingsConfig[] = [
    {
      title: 'Trig Pillars',
      value(): boolean {
        return trigSettings.trig;
      },
      toggle(checked: boolean): void {
        setTrigSetting(checked);
      },
      children: [
        {
          title: 'Trig Condition',
          settings: trigSettings.conditions,
          toggleAll(checked: boolean): void {
            Object.values(TrigCondition).forEach((condition) => setTrigConditionSetting(condition, checked));
          },
          toggle(condition: TrigCondition, checked: boolean): void {
            setTrigConditionSetting(condition, checked);
          },
        },
        {
          title: 'Trig Country',
          settings: trigSettings.countries,
          toggleAll(checked: boolean): void {
            Object.values(TrigCountry).forEach((country) => setTrigCountrySetting(country, checked));
          },
          toggle(country: TrigCountry, checked: boolean): void {
            setTrigCountrySetting(country, checked);
          },
        },
        {
          title: 'National Parks and AONBs',
          settings: trigSettings.nationalParksAndAreasOfNaturalBeauty,
          toggleAll(checked: boolean): void {
            Object.keys(trigSettings.nationalParksAndAreasOfNaturalBeauty).forEach((setting) =>
              setNationalParkAndAreaOfNaturalBeautySetting(setting as NationalPark | AreaOfNaturalBeauty, checked),
            );
          },
          toggle(value: NationalPark | AreaOfNaturalBeauty, checked: boolean): void {
            setNationalParkAndAreaOfNaturalBeautySetting(value, checked);
          },
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      {settingsConfig.map(({ title, value, toggle, children }) => (
        <details key={title} open={true}>
          <summary className={styles['settings-item-summary']}>
            <label>
              <input type="checkbox" checked={value()} onChange={({ target: { checked } }) => toggle(checked)} />
              <b>Trig Pillars</b>
            </label>
          </summary>

          {children?.map(({ title, settings, toggleAll, toggle }) => (
            <details key={title}>
              <summary className={styles['settings-child-item-summary']}>
                <label>
                  <input
                    type="checkbox"
                    checked={Object.values(settings).every((value) => value)}
                    onChange={({ target: { checked } }) => toggleAll(checked)}
                  />
                  <b>{title}</b>
                </label>
              </summary>

              <div className={styles['settings-container']}>
                {Object.entries(settings).map(([setting, value]) => (
                  <label key={setting} className={styles.label}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={({ target: { checked } }) =>
                        toggle(setting as TrigCountry | TrigCondition | NationalPark | AreaOfNaturalBeauty, checked)
                      }
                    />
                    {setting}
                  </label>
                ))}
              </div>
            </details>
          ))}
        </details>
      ))}
    </div>
  );
}

export default MapFilter;
