import InformationPanel from './InformationPanel';
import Pill from '../Pill/Pill';
import { counties, CountyName, RegionName, CountryName } from '@/data/counties';
import { toTitleCase } from '@/utils';
import styles from './InformationPanel.module.css';

interface Props {
  selectedCountry: CountryName;
  handleCountyClick(countyName: CountyName): void;
  handleRegionClick(regionName: RegionName): void;
}

function CountryInformationPanel({ selectedCountry, handleCountyClick, handleRegionClick }: Props) {
  return (
    <InformationPanel>
      <h1>{toTitleCase(selectedCountry)}</h1>

      <h2>Regions</h2>
      <div className={styles['pills-container']}>
        {counties
          .filter((county) => county.country === selectedCountry)
          .reduce((regions: JSX.Element[], county) => {
            county.regions.forEach((region) => {
              if (!regions.some((r) => r.key === region)) {
                regions.push(
                  <Pill key={region} content={toTitleCase(region)} handleClick={() => handleRegionClick(region)} />,
                );
              }
            });
            return regions;
          }, [])}
      </div>

      <h2>Counties</h2>
      <div className={styles['pills-container']}>
        {counties
          .filter((county) => county.country === selectedCountry)
          .map((county) => (
            <Pill
              key={county.name}
              content={toTitleCase(county.name)}
              handleClick={() => handleCountyClick(county.name)}
            />
          ))}
      </div>
    </InformationPanel>
  );
}

export default CountryInformationPanel;
