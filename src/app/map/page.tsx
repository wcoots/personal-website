'use client';
import { useCountySelection, useLocation } from '@/hooks';
import { counties } from '@/data/counties';
import { colourPallets, ColourPalletName } from '@/data/colours';
import {
  DropDown,
  CountyPolygon,
  LocationPin,
  CountyInformationPanel,
  RegionInformationPanel,
  CountryInformationPanel,
} from '@/components';
import styles from './map.module.css';

export default function Map() {
  const { userLocation, getLocation } = useLocation();

  const {
    selectedCounty,
    selectedRegion,
    selectedCountry,
    selectedColourPallet,
    imageLoading,
    setImageLoading,
    handleCountyClick,
    handleRegionClick,
    handleCountryClick,
    handlePalletChange,
    generatePolygonColour,
  } = useCountySelection();

  return (
    <div className={styles['map-page-container']}>
      <div className={styles['map-page-header']}>
        <DropDown<ColourPalletName>
          title="Theme"
          initialValue={selectedColourPallet}
          options={Object.keys(colourPallets) as ColourPalletName[]}
          handleChange={handlePalletChange}
        />

        <button className={styles['get-location-button']} onClick={() => getLocation()}>
          Get Location
        </button>
      </div>

      <div id="mapBackground" className={styles['map-background']}>
        <div className={styles['map-container']}>
          {counties.map((county) => {
            return <CountyPolygon key={county.name} county={county} colour={generatePolygonColour(county)} />;
          })}

          {userLocation && (
            <LocationPin xPosition={userLocation.x} yPosition={userLocation.y} colourPallet={selectedColourPallet} />
          )}
        </div>
      </div>

      {selectedCounty && (
        <CountyInformationPanel
          selectedCounty={selectedCounty}
          imageLoading={imageLoading}
          handleCountyClick={handleCountyClick}
          handleRegionClick={handleRegionClick}
          handleCountryClick={handleCountryClick}
          setImageLoading={setImageLoading}
        />
      )}

      {selectedRegion && (
        <RegionInformationPanel
          selectedRegion={selectedRegion}
          handleCountyClick={handleCountyClick}
          handleCountryClick={handleCountryClick}
        />
      )}

      {selectedCountry && (
        <CountryInformationPanel
          selectedCountry={selectedCountry}
          handleCountyClick={handleCountyClick}
          handleRegionClick={handleRegionClick}
        />
      )}

      <div className={styles.disclaimer}>
        Disclaimer: Counties are complicated and have many definitions. This map represents the{' '}
        <a
          href="https://en.wikipedia.org/wiki/Ceremonial_counties_of_England"
          target="_blank"
          className={styles['wikipedia-external-link']}
        >
          Ceremonial Counties of England
        </a>
        {' and the '}
        <a
          href="https://en.wikipedia.org/wiki/Historic_counties_of_Wales"
          target="_blank"
          className={styles['wikipedia-external-link']}
        >
          Historic Counties of Wales
        </a>
        .
      </div>
    </div>
  );
}
