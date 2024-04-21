import Image from 'next/image';
import Pill from '../Pill/Pill';
import { County, CountyName, RegionName, CountryName } from '@/data/counties';
import { toTitleCase } from '@/utils';
import styles from './InformationPanel.module.css';

interface Props {
  selectedCounty: County;
  imageLoading: boolean;
  handleCountyClick(countyName: CountyName): void;
  handleRegionClick(regionName: RegionName): void;
  handleCountryClick(countryName: CountryName): void;
  setImageLoading(loading: boolean): void;
}

function CountyInformationPanel({
  selectedCounty,
  imageLoading,
  handleCountyClick,
  handleRegionClick,
  handleCountryClick,
  setImageLoading,
}: Props) {
  return (
    <div className={styles['information-panel']}>
      <h1>{toTitleCase(selectedCounty.name)}</h1>

      <h2>Country</h2>
      <Pill
        content={toTitleCase(selectedCounty.country)}
        handleClick={() => handleCountryClick(selectedCounty.country)}
      />

      <h2>Regions</h2>
      <div className={styles['pills-container']}>
        {selectedCounty.regions.map((region) => (
          <Pill key={region} content={toTitleCase(region)} handleClick={() => handleRegionClick(region)} />
        ))}
      </div>

      <h2>Borders</h2>
      <div className={styles['pills-container']}>
        {selectedCounty.borderingCounties.map((borderingCounty) => (
          <Pill
            key={borderingCounty}
            content={toTitleCase(borderingCounty)}
            handleClick={() => handleCountyClick(borderingCounty)}
          />
        ))}
      </div>

      <div style={{ display: imageLoading ? 'none' : 'block', width: '400px' }}>
        {selectedCounty.imageUrl && (
          <Image
            className={styles['county-image']}
            width={400}
            height={250}
            src={selectedCounty.imageUrl}
            alt={selectedCounty.name}
            loading="eager"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        )}
      </div>
    </div>
  );
}

export default CountyInformationPanel;
