import InformationPanel from './InformationPanel';
import Pill from '../Pill/Pill';
import { counties, CountyName, RegionName, CountryName } from '@/data/counties';
import { toTitleCase } from '@/utils';
import styles from './InformationPanel.module.css';

interface Props {
  selectedRegion: RegionName;
  handleCountyClick(countyName: CountyName): void;
  handleCountryClick(countryName: CountryName): void;
}

function RegionInformationPanel({ selectedRegion, handleCountyClick, handleCountryClick }: Props) {
  const regionCounties = counties.filter((county) => county.regions.includes(selectedRegion));

  return (
    <InformationPanel>
      <h1>{toTitleCase(selectedRegion)}</h1>

      <h2>Country</h2>
      <Pill
        content={toTitleCase(regionCounties[0].country)}
        handleClick={() => handleCountryClick(regionCounties[0].country)}
      />

      <h2>Counties</h2>
      <div className={styles['pills-container']}>
        {regionCounties.map((county) => (
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

export default RegionInformationPanel;
